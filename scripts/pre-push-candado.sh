#!/usr/bin/env bash
# Candado local del protocolo de sesiones de Mobbitrips (ver AGENTS.md). Lo dispara husky desde .husky/pre-push:
#   1) prohíbe el push directo a `portal` (rama de integración) y a `main` (el sitio publicado hoy);
#   2) si gitleaks está instalado, revisa que los commits que se van a subir no traigan secretos
#      (este repo es PÚBLICO: un secreto subido ya está expuesto aunque se borre después).
# Entran a `portal` solo los Pull Requests con CI verde (scripts/merge-si-verde.sh). Saltarlo con
# `git push --no-verify` solo con OK expreso de Emilio (ej. la Fase 9, cuando `portal` pasa a `main`).
remoto="${1:-origin}"
protegidas=(portal main)
nuevos=()
while read -r _ local_sha remote_ref _; do
  rama=${remote_ref#refs/heads/}
  for p in "${protegidas[@]}"; do
    if [ "$rama" = "$p" ]; then
      echo "✋ Push directo a '$p' bloqueado por el protocolo de sesiones." >&2
      echo "   Trabaja en una rama wip/<tema>-<máquina> y entra a 'portal' por Pull Request con CI verde (AGENTS.md)." >&2
      exit 1
    fi
  done
  case "$local_sha" in *[!0]*) nuevos+=("$local_sha") ;; esac   # todo en ceros = borrar una rama: nada que revisar
done
[ ${#nuevos[@]} -eq 0 ] && exit 0

# --- Secretos: solo los commits que el remoto todavía no tiene (nunca el historial) ---
if ! command -v gitleaks >/dev/null 2>&1; then
  echo "⚠️  gitleaks no está instalado: el push sigue, pero sin revisar secretos en esta máquina." >&2
  echo "    Mac: brew install gitleaks · laptop: winget install Gitleaks.Gitleaks (gratis)." >&2
  exit 0
fi
if git remote | grep -qxF -- "$remoto"; then ya_arriba="--remotes=$remoto"; else ya_arriba="--remotes"; fi
raiz=$(git rev-parse --show-toplevel)
# Reglas y lista de permitidos: .gitleaks.toml y .gitleaksignore de la raíz del worktree (si no hay, las de gitleaks).
gitleaks git "$raiz" --no-banner --log-level warn --redact --verbose --exit-code 99 \
  --log-opts="--no-merges ${nuevos[*]} --not $ya_arriba" </dev/null >&2
case $? in
  0)  echo "🔎 Secretos: nada en los commits que vas a subir (gitleaks)." >&2
      exit 0 ;;
  99) echo "✋ gitleaks encontró posibles secretos en lo que vas a subir (arriba, sin el valor). Push detenido." >&2
      echo "   Secreto real: sácalo del commit y rótalo. Falso positivo: agrega su Fingerprint a .gitleaksignore" >&2
      echo "   con el porqué, o pon \`gitleaks:allow\` en un comentario al final de esa línea." >&2
      exit 1 ;;
  *)  echo "⚠️  gitleaks falló al revisar (arriba el detalle); el push sigue." >&2
      exit 0 ;;
esac
