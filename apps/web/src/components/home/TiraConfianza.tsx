import { t, type ClaveTexto } from '@/textos/t';

const puntos: ClaveTexto[] = [
  'inicio.confianza.sinComision',
  'inicio.confianza.pagasDirecto',
  'marca.servicioMobbilink',
];

/**
 * Tira de confianza: lo que ofrece Mobbitrips en un renglón (en cel baja a dos). Solo lo decidido:
 * sin comisión, pagas directo al anfitrión, un servicio de Mobbilink. Los puntos coral hacen eco de
 * los círculos del logo; son decorativos y el texto va en carbón (contraste AA).
 */
export function TiraConfianza() {
  return (
    <section
      aria-label={t('inicio.confianza.aria')}
      className="border-y border-brand-border bg-white"
    >
      <ul
        role="list"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-4 text-sm font-medium text-brand-charcoal sm:px-6 lg:px-8"
      >
        {puntos.map((clave) => (
          <li key={clave} className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-primary" />
            {t(clave)}
          </li>
        ))}
      </ul>
    </section>
  );
}
