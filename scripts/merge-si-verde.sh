#!/usr/bin/env bash
# merge-si-verde.sh <pr> [opciones de gh pr merge] — integra (squash) un PR a `portal` SOLO con TODO su CI en verde.
# Falla CERRADO: sin checks, pendientes, rojos o cancelados → NO integra. Y solo integra PRs cuya base sea `portal`
# (nunca `main`: el sitio publicado no se toca hasta la Fase 9).
# Por qué: justo después de `mobbitrips-sesion.sh listo` el CI todavía no se registra y `gh pr checks --watch`
# sale al instante con «no checks reported»; buscar «fail» en esa salida vacía daba luz verde.
# (Adaptado de documentos/herramientas/merge-si-verde.sh de Mobbilink, donde así se integró un PR sin CI y otro con CI rojo.)
# Uso: desde la carpeta del repo (o su worktree):  scripts/merge-si-verde.sh 12 [--delete-branch]
set -uo pipefail
PRINCIPAL=portal
PR="${1:?uso: merge-si-verde.sh <numero_pr> [opciones extra de gh pr merge]}"; shift
leer() { gh pr checks "$PR" --json name,bucket 2>/dev/null; }
# 0) La base del PR tiene que ser `portal`.
base=$(gh pr view "$PR" --json baseRefName --jq .baseRefName 2>/dev/null || true)
[ "$base" = "$PRINCIPAL" ] || { echo "✗ #$PR: su base es '${base:-?}', no '$PRINCIPAL' — NO se integra"; exit 1; }
# 1) Esperar a que el CI se registre (máx ~5 min).
n=0
for _ in $(seq 1 30); do
  n=$(leer | jq 'length' 2>/dev/null || echo 0); [ "${n:-0}" -gt 0 ] && break; sleep 10
done
[ "${n:-0}" -gt 0 ] || { echo "✗ #$PR: el CI no arrancó en 5 min — NO se integra"; exit 1; }
# 2) Esperar a que termine todo. Dos rondas: un evento tardío (ready_for_review, push) mete corridas nuevas.
for _ in 1 2; do gh pr checks "$PR" --watch --interval 20 >/dev/null 2>&1; sleep 20; done
# 3) Solo pass/skipping, y al menos un pass.
todos=$(leer)
[ -n "$todos" ] && [ "$(jq length <<<"$todos")" -gt 0 ] || { echo "✗ #$PR: no pude leer los checks — NO se integra"; exit 1; }
malos=$(jq -r '[.[] | select(.bucket != "pass" and .bucket != "skipping") | "\(.name)=\(.bucket)"] | join(", ")' <<<"$todos")
[ -z "$malos" ] || { echo "✗ #$PR NO se integra: $malos"; exit 1; }
[ "$(jq '[.[] | select(.bucket == "pass")] | length' <<<"$todos")" -gt 0 ] || { echo "✗ #$PR: ningún check pasó (todos omitidos) — NO se integra"; exit 1; }
# El estado manda, no el código de salida: con --delete-branch, gh sale con error si la rama local vive en un
# worktree de sesión (el merge ya ocurrió). Se comprueba MERGED y se avisa de la rama.
salida=$(gh pr merge "$PR" --squash "$@" 2>&1); rc=$?
estado=$(gh pr view "$PR" --json state --jq .state 2>/dev/null)
[ "$estado" = "MERGED" ] || { echo "✗ #$PR: no quedó integrado (estado=$estado): $(tail -1 <<<"$salida")"; exit 1; }
[ $rc -eq 0 ] || echo "⚠ #$PR integrado, pero: $(tail -1 <<<"$salida") (cerrar el worktree con mobbitrips-sesion.sh cerrar y borrar la rama)"
echo "✓ #$PR integrado con CI verde: $(jq -r 'map("\(.name)=\(.bucket)") | join(", ")' <<<"$todos")"
