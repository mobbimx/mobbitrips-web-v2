<!-- BEGIN:protocolo-sesiones-mobbitrips (adaptado del protocolo de Mobbilink; la rama principal aquí es `portal`) -->

# Protocolo de sesiones — Mobbitrips

Este repo lo tocan **varias sesiones a la vez** (Claude Code, Codex o cualquier agente), desde más de una
máquina de Emilio, y a veces varias sesiones en la **misma** máquina. Estas reglas existen para que no se
pisen y para que nada se pierda. Aplican a TODA sesión, sin excepción.

> **El repo es PÚBLICO.** Secretos, llaves, cifras internas y datos de clientes jamás van aquí, ni en un
> commit ni en un PR ni en un comentario: lo que se sube ya está expuesto aunque se borre después.

## 0. Antes de tocar nada — nunca trabajar sobre una copia vieja

- `git fetch origin --prune` y mira qué hay EN USO: `gh pr list` (todas las máquinas) y
  `git worktree list` (esta máquina). Atajo: `scripts/mobbitrips-sesion.sh lista`.
- **La verdad de "qué está hecho / qué falta" vive EN EL REPO**, no en la memoria personal de nadie:
  el log de cambios en `docs/BITACORA.md` y el rumbo en `docs/SPRINT_ACTUAL.md`. Si dos fuentes se
  contradicen, gana el código integrado en `portal` + `docs/BITACORA.md`.

## 1. Las ramas: `portal` es la principal; `main` no se toca

- **`portal`** es la rama de integración de este trabajo (rediseño y base ligera). Solo recibe cambios por
  **Pull Request con CI verde**. Commit directo a `portal` = prohibido, aunque sea "chiquito".
- **`main`** sigue siendo lo que sirve mobbitrips.com. **No se toca** hasta la Fase 9 del plan, cuando
  `portal` pase a ser `main` por decisión expresa de Emilio. `chore/design-tooling` (el punto de partida de
  `portal`) tampoco se toca.
- GitHub (plan gratuito) no permite bloquear ramas desde el servidor; el candado es un gancho `pre-push`
  versionado (`.husky/pre-push` → `scripts/pre-push-candado.sh`) que se activa solo al hacer `pnpm install`
  y rechaza el push directo a `portal` y a `main`. Si gitleaks está instalado (Mac: `brew install gitleaks`),
  el mismo candado revisa que los commits que vas a subir no traigan secretos; si no está, avisa y deja pasar.
  `git push --no-verify` salta el candado: solo con OK expreso de Emilio.
- Las vistas previas de Vercel y el deploy salen de ramas ya subidas a GitHub, nunca de una carpeta local.

## 2. Una sesión = un worktree + una rama

La carpeta base (`~/Desktop/mobbitrips-web-v2`) es solo para integrar: fetch, revisar PRs, hacer merge.
**Nadie edita ahí ni cambia de rama ahí.** Cada sesión trabaja en su propia copia (git worktree) ligada al
mismo repo, en `~/Desktop/mobbitrips-sesiones/<tema>`; así tres sesiones en la misma máquina no se mueven el piso.

Al empezar (atajo en Mac y laptop con bash: `scripts/mobbitrips-sesion.sh nueva <tema>`, que hace todo lo de abajo):

```
cd ~/Desktop/mobbitrips-web-v2
git fetch origin --prune
git worktree add ../mobbitrips-sesiones/<tema> -b wip/<tema>-<maquina> origin/portal
cd ../mobbitrips-sesiones/<tema>
pnpm install --frozen-lockfile     # también activa los ganchos (commitlint + candado pre-push)
git commit --allow-empty -m "chore: inicio de sesión de <tema> (<maquina>)"   # GitHub exige ≥1 commit para abrir el PR
git push -u origin wip/<tema>-<maquina>
gh pr create --base portal --draft --title "[EN USO] <tema> (<maquina>)" --body "Toca: <módulos o archivos>"
```

`<maquina>` = `mac` o `laptop`. `<tema>` = 2-4 palabras con guiones (ej. `base-ligera`).

**El PR en Draft es el letrero de EN USO.** Antes de escoger tema, revisa qué está ocupado. Si tu tema pisa
archivos de un PR abierto, cambia el alcance o espera a que se integre. Nunca dos sesiones sobre el mismo módulo.

Los archivos locales que no se versionan (`apps/web/.env.local`, `.vercel/`) se copian de la carpeta base al
worktree nuevo; el atajo lo hace solo. Nunca se suben.

## 3. Mientras trabajas

- `git pull --rebase origin portal` al empezar cada bloque de trabajo (mínimo una vez al día).
- Commits chicos y frecuentes, **conventional commits en español** (`feat(web): …`, `fix(hero): …`,
  `chore(ci): …`, `docs: …`); husky + commitlint rechazan los que no cumplan (encabezado ≤ 100 caracteres).
- **Push al terminar cada bloque.** Una rama sin push no existe para las demás sesiones ni para la otra máquina.
- Si cambias algo que otra sesión debe saber (rutas, variables de entorno, dependencias, contratos con n8n),
  anótalo en `docs/BITACORA.md` dentro del mismo PR.
- Secretos solo en `process.env.*` y en Vercel; rutas absolutas de una máquina jamás al repo.

## 4. Para cerrar

1. Verificaciones locales en verde (comandos en "Datos de este repo").
2. Push. Ponerle al PR el título real de la entrega, **como conventional commit** (ese título será el mensaje
   del commit al integrar) y quitar el Draft: `scripts/mobbitrips-sesion.sh listo <tema> "<qué quedó>"`.
   Esperar CI verde en GitHub.
3. Integrar **solo con CI verde**: `scripts/merge-si-verde.sh <pr> --delete-branch`. Nunca un `gh pr merge`
   suelto: el script falla cerrado (sin checks, pendientes o rojos no integra) y rechaza PRs cuya base no sea
   `portal`. Un PR = una entrega coherente, nunca "paso 1/2/3".
4. Borrar el worktree: `scripts/mobbitrips-sesion.sh cerrar <tema>`.

## 5. Conflictos

- Conflicto al rebase → se resuelve en TU rama. `git push --force-with-lease` solo sobre tu rama `wip/`.
- Dos PRs tocan lo mismo → entra primero el que esté listo; el otro hace rebase sobre `portal`.
- Nunca `git push --force` a `portal` ni a `main`, nunca `git reset --hard` ni `git clean -fd` en la base,
  nunca borrar ramas `wip/` ajenas.

## 6. Contexto compartido (para que dé igual desde qué máquina o sesión se abra)

- Lo que cualquiera necesita saber del proyecto vive **en el repo**: este `AGENTS.md`, `CLAUDE.md`, `docs/`.
  No en la memoria personal de nadie. La memoria personal (`~/.claude/projects/*/memory`) es de cada persona
  y no se copia al repo.
- Si descubres algo del proyecto que solo tú sabes, lo escribes aquí o en `docs/`, no en tu memoria.

## 7. Qué modelo de IA para qué tarea (que los tokens rindan)

Regla de Emilio: **el modelo caro solo donde cambia el resultado.** Planear, dirigir y juzgar no es lo mismo
que leer, ejecutar y verificar. Fable planea y juzga; Opus ejecuta lo difícil (layout global, scroll, ciclo de
vida); Sonnet ejecuta lo medio y revisa; Haiku lee y mide (listar, grep, correr y anotar). Un fork de sesión
hereda el modelo del padre: para abaratar se usan agentes frescos con el modelo explícito y el brief completo.

<!-- END:protocolo-sesiones-mobbitrips -->

## Datos de este repo — Mobbitrips Web v2 (Next.js 14, monorepo pnpm + Turborepo)

- Rama principal: **`portal`**. `main` = sitio publicado hoy (intocable hasta la Fase 9).
- Gestor de paquetes: **pnpm 9.15.0** (`packageManager` en `package.json`), Node ≥ 20. Nunca npm ni yarn.
- Verificación local antes de cerrar: `pnpm lint && pnpm type-check && pnpm build`. El build compila **sin
  secretos** (rutas de `/api` en `force-dynamic` y clientes de Supabase, Stripe y Resend perezosos).
- CI (GitHub Actions, `.github/workflows/ci.yml`): en cada PR y en cada push a `portal` corre
  `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm type-check` y `pnpm build`.
- Visualizador local único: `pnpm dev` → `http://localhost:3000` (ver `docs/REGLAS_INMUTABLES.md`).
- Archivos locales NO versionados que necesita cada worktree: `apps/web/.env.local` y `.vercel/`
  (se copian de la carpeta base; las llaves reales viven en Vercel, nunca en el repo).
- Detalle del producto, identidad y reglas de oro: `CLAUDE.md`, `docs/MASTER.md`, `apps/web/CLAUDE.md`.
