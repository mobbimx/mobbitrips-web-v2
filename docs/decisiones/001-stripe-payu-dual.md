# ADR 001 — Estrategia dual de pagos: Stripe + PayU

**Fecha**: 2026-04-XX
**Estado**: Aceptada
**Decidido por**: Daniel + equipo
**Contexto**: Sprint 2.3-2.4 (Fase 2)

---

## Contexto

Mobbitrips necesita aceptar pagos de huéspedes B2C para sus reservas vacacionales. El mercado objetivo es México (Xalapa, Veracruz), con proporción significativa de viajeros mexicanos que prefieren pagar en efectivo vía OXXO o transferencia SPEI, y viajeros internacionales/premium que usan tarjeta.

## Opciones evaluadas

### Opción A: Solo Stripe
- ✅ DX excelente, webhooks limpios, documentación superior.
- ✅ Apple Pay / Google Pay out of the box.
- ❌ No soporta OXXO Pay directamente en México.
- ❌ No soporta SPEI directamente.
- ❌ Excluye ~30% del mercado mexicano que prefiere efectivo/transferencia.

### Opción B: Solo PayU México
- ✅ Cobertura local completa (OXXO, SPEI, tarjetas).
- ✅ Antifraude robusto.
- ❌ DX inferior a Stripe (API con signatures MD5, mixed XML/JSON).
- ❌ Pricing opaco (requiere negociación comercial).
- ❌ Experiencia premium menor para huéspedes internacionales.

### Opción C: Dual Stripe + PayU
- ✅ Stripe captura flujo premium internacional.
- ✅ PayU captura OXXO + SPEI local.
- ✅ Mejor UX para cada segmento.
- ❌ Más complejidad de integración (+1 sprint).
- ❌ Dos webhook handlers, dos webhooks, dos conciliaciones.
- ❌ Dos proveedores que mantener.

## Decisión

**Opción C: Dual Stripe + PayU.**

Stripe como default visible (tarjetas, Apple/Google Pay). PayU como secundaria para OXXO y SPEI. Usuario elige método en checkout, sistema enruta a la pasarela correspondiente.

## Justificación

1. Perder 30% del mercado por no aceptar OXXO es inaceptable para un negocio local.
2. No tener Stripe para internacionales degrada UX premium.
3. La complejidad adicional es contenida gracias a n8n como orquestador.
4. Ambos webhooks se reconcilian en un solo lugar (Zoho Books) por reserva.

## Consecuencias

### Positivas
- Cobertura de 100% del mercado objetivo.
- UX óptima por segmento.
- Flexibilidad de desactivar una si es necesario.
- Redundancia: si una pasarela falla, la otra funciona.

### Negativas
- +1 sprint en Fase 2 (2.3 Stripe, 2.4 PayU).
- 2 packages en monorepo: `stripe-client` y `payu-client`.
- 4 workflows n8n para pagos (WF-04a/b/c/d) en lugar de 1.
- Conciliación bancaria más compleja.
- Mayor carga cognitiva de soporte (dos sistemas).

### Riesgos mitigados
- Cambios regulatorios: si una pasarela cambia reglas, la otra absorbe.
- Fees competitivos: poder negociar con una usando la otra como leverage.

## Alternativas descartadas

- **Conekta**: buen precio (2.9%) pero menos internacional y sin Apple Pay nativo robusto.
- **Mercado Pago**: demasiado enfocado a e-commerce retail.
- **OpenPay**: similar a PayU pero con menos tracción internacional.

## Implementación

Ver `docs/MASTER.md` sección 9 (Pagos — Stripe + PayU) para detalles técnicos completos.

Sprint 2.3: Stripe integration (1 semana).
Sprint 2.4: PayU integration (1 semana).

## Revisión

Revisar este ADR en 6 meses después del lanzamiento de Fase 2. KPIs a evaluar:

- % de pagos por pasarela.
- Tasa de conversión por método.
- Fees totales pagados.
- Número de incidentes por pasarela.
- Tiempo de soporte dedicado a pagos.

Si Stripe resuelve OXXO nativamente en ese momento (roadmap de Stripe México), reevaluar consolidar a una sola pasarela.
