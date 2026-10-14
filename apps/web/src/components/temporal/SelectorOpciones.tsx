'use client';

import { useState } from 'react';

/**
 * TEMPORAL (opciones en vivo 14-oct): selector flotante para comparar en la página real el logo,
 * el botón «Anuncia tu casa» y la tira de confianza. Cambia clases en `body`; los estilos de cada
 * opción viven aquí abajo. Se borra completo al elegir. NUNCA se publica con esto puesto.
 */
const GRUPOS = [
  { id: 'lg', nombre: 'Logo', ops: ['Hoy', 'Logo oficial', 'Logo oficial grande'] },
  { id: 'bt', nombre: 'Botón', ops: ['Hoy', 'Coral suave', 'Oscuro', 'Borde coral'] },
  { id: 'tr', nombre: 'Tira', ops: ['Hoy', 'Con íconos', 'Bajo el buscador', 'Banda coral'] },
] as const;
type Id = (typeof GRUPOS)[number]['id'];
/** Abre con la combinación recomendada: A2 · B1 · C2. */
const INICIO: Record<Id, number> = { lg: 2, bt: 1, tr: 2 };

const CSS = `
body.lg-1 .op-logo-hoy, body.lg-2 .op-logo-hoy { display: none; }
body.lg-1 .op-logo-oficial, body.lg-2 .op-logo-oficial { display: block; }
body.lg-1 .op-logo-oficial { height: 32px; }
body.lg-2 .op-logo-oficial { height: 40px; }
@media (min-width: 768px) {
  body.lg-1 .op-logo-oficial { height: 40px; }
  body.lg-2 .op-logo-oficial { height: 50px; }
}
body.bt-1 .op-casa, body.bt-2 .op-casa, body.bt-3 .op-casa { display: block; }
body.bt-1 .op-anuncia, body.bt-2 .op-anuncia, body.bt-3 .op-anuncia { gap: 8px; }
body.bt-1 .op-anuncia { background: #FCE9E8; border-color: #FCE9E8; color: var(--coral-950); }
body.bt-1 .op-anuncia:hover { border-color: #F4A09E; }
body.bt-2 .op-anuncia { background: #3D3D3D; border-color: #3D3D3D; color: #fff; }
body.bt-3 .op-anuncia { border: 1.5px solid #ED6864; color: var(--coral-950); }
body.tr-1 .op-punto, body.tr-3 .op-punto { display: none; }
body.tr-1 .op-ic, body.tr-3 .op-ic { display: flex; }
body.tr-1 .op-tira ul { column-gap: 56px; row-gap: 14px; padding-block: 22px; }
body.tr-1 .op-tira li { gap: 12px; font-size: 15px; font-weight: 600; }
body.tr-1 .op-ic { width: 40px; height: 40px; border-radius: 9999px; background: #FCE9E8; color: var(--coral-950); align-items: center; justify-content: center; }
body.tr-3 .op-tira { background: #FCE9E8; border-color: #F6D3D1; }
body.tr-3 .op-tira ul { column-gap: 0; row-gap: 10px; padding-block: 18px; }
body.tr-3 .op-tira li { gap: 10px; font-size: 15px; font-weight: 600; padding-inline: 28px; }
body.tr-3 .op-tira li + li { border-left: 1px solid #EFC2BF; }
body.tr-3 .op-ic { color: var(--coral-950); }
@media (max-width: 767px) { body.tr-3 .op-tira li { padding-inline: 12px; } body.tr-3 .op-tira li + li { border-left: 0; } }
body.tr-2 .op-tira { display: none; }
body.tr-2 .op-chips { display: flex; }
`;

const clasesIniciales = Object.entries(INICIO)
  .map(([g, i]) => `${g}-${i}`)
  .join(' ');

export function SelectorOpciones() {
  const [sel, setSel] = useState<Record<Id, number>>(INICIO);
  const [abierto, setAbierto] = useState(true);

  const elegir = (g: Id, i: number) => {
    document.body.classList.remove(`${g}-${sel[g]}`);
    document.body.classList.add(`${g}-${i}`);
    setSel({ ...sel, [g]: i });
  };

  return (
    <>
      <style>{CSS}</style>
      {/* Pone la combinación inicial antes de pintar, para que no parpadee «Hoy». */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.add(${clasesIniciales
            .split(' ')
            .map((c) => JSON.stringify(c))
            .join(',')})`,
        }}
      />
      <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
        <div className="w-full max-w-md rounded-2xl border border-brand-border bg-white/95 p-3 text-brand-charcoal shadow-xl">
          <button
            type="button"
            onClick={() => setAbierto(!abierto)}
            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-gray"
            aria-expanded={abierto}
          >
            Opciones (temporal) <span aria-hidden="true">{abierto ? '▾' : '▴'}</span>
          </button>
          {abierto && (
            <div className="mt-2 grid gap-2">
              {GRUPOS.map((g) => (
                <div key={g.id} className="flex items-center gap-2">
                  <span className="w-12 shrink-0 text-sm font-semibold">{g.nombre}</span>
                  <div className="flex flex-1 gap-1">
                    {g.ops.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={sel[g.id] === i}
                        onClick={() => elegir(g.id, i)}
                        className={`h-9 flex-1 rounded-full text-sm font-semibold ${sel[g.id] === i ? 'bg-brand-charcoal text-white' : 'bg-brand-cream text-brand-charcoal'}`}
                      >
                        {i === 0 ? 'Hoy' : i}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-xs text-brand-gray">
                {GRUPOS.map((g) => g.ops[sel[g.id]]).join(' · ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
