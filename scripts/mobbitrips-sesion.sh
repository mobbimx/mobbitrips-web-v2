#!/usr/bin/env bash
# Atajo del protocolo de sesiones de Mobbitrips (ver AGENTS.md). Adaptado de mobbilink-sesion.sh.
#   mobbitrips-sesion.sh nueva  <tema>             → worktree + rama wip/<tema>-<máquina> + push + PR draft [EN USO] → portal
#   mobbitrips-sesion.sh listo  <tema> "<título>"  → título real al PR (conventional commit) + quita Draft (el CI decide)
#   mobbitrips-sesion.sh cerrar <tema>             → borra el worktree y actualiza `portal` en la base
#   mobbitrips-sesion.sh lista                     → qué está EN USO (PRs abiertos + worktrees locales)
#   mobbitrips-sesion.sh hooks [carpeta]           → (re)activa husky: commitlint + candado pre-push en esa copia
# El PR se integra con scripts/merge-si-verde.sh <pr> (solo con CI verde).
# Se puede correr desde la base o desde cualquier worktree: ubica la base por sí solo.
# Los worktrees viven al lado de la base: <carpeta de la base>/../mobbitrips-sesiones/<tema>.
set -euo pipefail
PRINCIPAL=portal
COMUN=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null) || { echo "Corre esto dentro del repo de Mobbitrips"; exit 1; }
BASE=$(dirname "$COMUN")                        # carpeta del clon "base" (solo se usa para integrar)
SESIONES="$(dirname "$BASE")/mobbitrips-sesiones"
case "${MOBBITRIPS_MAQUINA:-$(uname -s)}" in Darwin|mac) MAQ=mac ;; *) MAQ=laptop ;; esac
GH_REPO=$(git -C "$BASE" remote get-url origin | sed -E 's#.*github.com[:/]##; s#\.git$##')
# Archivos locales que no se versionan y cada worktree necesita (los crea 0A.1: vercel link / env pull).
LOCALES=(apps/web/.env.local .vercel apps/web/.vercel)

tema_valido() { [[ "${1:-}" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || { echo "Tema inválido: usa 2-4 palabras en minúsculas con guiones (ej. base-ligera)"; exit 1; }; }

case "${1:-}" in
  nueva)
    tema=${2:-}; tema_valido "$tema"; rama="wip/$tema-$MAQ"; wt="$SESIONES/$tema"
    [ -d "$wt" ] && { echo "Ya existe $wt"; exit 1; }
    git -C "$BASE" fetch origin --prune
    echo "== Ya EN USO (si tu tema pisa algo de aquí, cambia el alcance o espera):"
    gh pr list -R "$GH_REPO" --state open || true
    mkdir -p "$SESIONES"
    git -C "$BASE" worktree add "$wt" -b "$rama" "origin/$PRINCIPAL"
    for f in "${LOCALES[@]}"; do
      [ -e "$BASE/$f" ] && { mkdir -p "$wt/$(dirname "$f")"; cp -pR "$BASE/$f" "$wt/$f"; }
    done
    # Dependencias: pnpm las enlaza desde su almacén global (segundos). Sin HUSKY=0 a propósito: el `prepare`
    # activa los ganchos (commitlint + candado pre-push) también en este worktree.
    (cd "$wt" && pnpm install --frozen-lockfile --prefer-offline)
    git -C "$wt" commit --allow-empty -q -m "chore: inicio de sesión de $tema ($MAQ)"   # GitHub exige ≥1 commit para abrir el PR
    git -C "$wt" push -u origin "$rama"
    gh pr create -R "$GH_REPO" --head "$rama" --base "$PRINCIPAL" --draft \
      --title "[EN USO] $tema ($MAQ)" --body "Toca: (rellenar módulos/archivos)" || true
    echo "→ Trabaja en: $wt"
    ;;
  listo)
    tema=${2:-}; tema_valido "$tema"; titulo=${3:?uso: mobbitrips-sesion.sh listo <tema> \"<título>\"}
    rama="wip/$tema-$MAQ"; wt="$SESIONES/$tema"
    # El título del PR será el mensaje del commit al integrar (squash): debe ser un conventional commit.
    [[ "$titulo" =~ ^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._/-]+\))?!?:\ .+ ]] \
      || { echo "El título debe ser conventional commit, ej. «feat(web): quitar el peso global del layout»"; exit 1; }
    git -C "$wt" push -q
    gh pr edit -R "$GH_REPO" "$rama" --title "$titulo" >/dev/null
    gh pr ready -R "$GH_REPO" "$rama"
    ;;
  cerrar)
    tema=${2:-}; tema_valido "$tema"; rama="wip/$tema-$MAQ"; wt="$SESIONES/$tema"
    git -C "$BASE" worktree remove "$wt"
    git -C "$BASE" fetch origin --prune
    # Actualiza `portal` en la base sin tocar la rama que tenga abierta (solo avance rápido).
    if [ "$(git -C "$BASE" branch --show-current)" = "$PRINCIPAL" ]; then
      git -C "$BASE" pull --ff-only
    else
      git -C "$BASE" fetch origin "$PRINCIPAL:$PRINCIPAL" 2>/dev/null || true
    fi
    # La rama local se borra solo si su PR ya quedó integrado (un squash no deja la rama como «merged» para git).
    if [ "$(gh pr view -R "$GH_REPO" "$rama" --json state --jq .state 2>/dev/null || true)" = "MERGED" ]; then
      git -C "$BASE" branch -D "$rama" >/dev/null && echo "→ Rama local $rama borrada (su PR está integrado)."
    else
      echo "⚠ El PR de $rama NO figura como integrado: la rama local se conserva."
    fi
    echo "→ Worktree borrado y base actualizada."
    ;;
  lista)
    echo "== PRs abiertos (EN USO)"; gh pr list -R "$GH_REPO" --state open || true
    echo "== Worktrees en esta máquina"; git -C "$BASE" worktree list | grep -v "^$BASE " || echo "(ninguno)"
    ;;
  hooks)
    dest=${2:-$PWD}
    (cd "$dest" && pnpm exec husky)
    [ -f "$dest/.husky/_/pre-push" ] && echo "husky activo en $dest (commitlint + candado pre-push)" \
      || echo "⚠ $dest no tiene .husky/pre-push (¿rama sin el protocolo? basa tu rama en origin/$PRINCIPAL)"
    ;;
  *) sed -n 2,9p "$0" ;;
esac
