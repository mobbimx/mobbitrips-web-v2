# ADR 003 — Moneda única de cobro: MXN

**Fecha**: 2026-04-XX
**Estado**: Aceptada
**Decidido por**: Daniel + equipo
**Contexto**: Planeación de pagos (Fase 2)

---

## Contexto

Mobbitrips opera en Xalapa, Veracruz, México, y recibe tanto huéspedes mexicanos como extranjeros (principalmente Estados Unidos, Canadá y Europa). Se planteó la duda de si cobrar en MXN, en USD (como algunos hoteles), o permitir multi-currency pricing.

## Opciones evaluadas

### Opción A: Cobrar en USD principalmente
- Preferencia de huéspedes internacionales.
- Requiere cuenta bancaria en USD en México.
- CFDI en USD requiere documentar TC diario.
- Stripe convierte con markup (~2%) que sale del bolsillo de Mobbitrips.

### Opción B: Multi-currency pricing
- Mostrar precios en moneda local del huésped, cobrar en esa moneda.
- Requiere fijar tipos de cambio y absorber riesgo cambiario.
- Triplica complejidad contable.
- CFDI mexicanos complicados (numeración mixta).

### Opción C: Cobrar siempre en MXN
- Cero riesgo cambiario para Mobbitrips.
- Contabilidad y CFDI limpios.
- Banco del huésped aplica su TC (costo absorbido por el huésped, no por Mobbitrips).
- Huéspedes internacionales ven conversión informativa en checkout.

## Decisión

**Opción C: Cobrar siempre en MXN.**

UX del checkout muestra conversión informativa a USD, EUR y CAD usando Frankfurter API (gratis). Disclaimer visible: *"La conversión final la determina tu banco. Cobro realizado en MXN."*

## Justificación

1. **Cero riesgo cambiario**: si el peso se devalúa o aprecia mañana, no afecta márgenes.
2. **CFDI nativo**: facturación mexicana se hace en MXN sin complicaciones de TC diario.
3. **Liquidación rápida**: Stripe México deposita MXN a cuenta bancaria nacional en 2 días hábiles.
4. **SAT compliance simplificado**: sin declaraciones de operaciones en moneda extranjera.
5. **Best practice en el mercado**: 99% de hoteles y Airbnbs en México cobran en MXN.
6. **UX no sufre**: conversión informativa cubre la expectativa del huésped internacional.

## Consecuencias

### Positivas
- Contabilidad limpia, auditoría sencilla.
- No hay pérdidas por markups de conversión de Stripe.
- Facturación CFDI sin complicaciones.
- Proceso idéntico para huéspedes mexicanos y extranjeros desde el lado operativo.

### Negativas
- Huésped internacional ve un número "raro" en MXN (ej: $10,500 en lugar de $595).
  - Mitigación: hint informativo en checkout y en PropertyCard para tráfico internacional (detectado por IP).
- Posible fricción menor al ver el monto en el estado de cuenta bancario del huésped (dependiendo de su banco).
  - Mitigación: disclaimer claro en checkout.

### Riesgos
- Huéspedes que piensan que pagarán "muy poco" en USD al ver el hint y luego se llevan sorpresa con el cambio real de su banco.
  - Mitigación: disclaimer "La conversión final la determina tu banco."

## Alternativas descartadas

- **Multi-currency con pricing dinámico**: descartada por complejidad contable y riesgo cambiario.
- **Solo USD**: descartada por complejidad CFDI y necesidad de cuenta USD.
- **Dual MXN/USD (opción al huésped)**: descartada porque cada opción tiene su propia conciliación.

## Implementación

- `NEXT_PUBLIC_DEFAULT_CURRENCY=MXN` hardcoded.
- Stripe PaymentIntents con `currency: 'mxn'` siempre.
- PayU Mexico en MXN únicamente.
- Zoho Books en MXN.
- Componente `<CurrencyHint />` en checkout con Frankfurter API.
- Caché 1h de FX rates en Supabase tabla `fx_rates_cache`.

Ver `docs/MASTER.md` sección 9 para detalles.

## Revisión

Revisar este ADR en 12 meses. KPIs a evaluar:

- Tasa de abandono en checkout para tráfico internacional.
- Queries de soporte relacionadas con conversión/pago.
- Comparar con métricas de competidores mexicanos que cobran en USD.

Si hay evidencia clara de que cobrar en USD aumentaría conversión internacional en >15% después de fees y complejidad, reevaluar.
