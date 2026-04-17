# ADR 002 — Zoho One como ERP único

**Fecha**: 2026-04-XX
**Estado**: Aceptada
**Decidido por**: Daniel + equipo
**Contexto**: Planeación inicial (Fase 1-3)

---

## Contexto

Mobbitrips opera en México y necesita emitir facturación fiscal (CFDI 4.0), gestionar CRM de leads (B2C huéspedes + B2B propietarios), llevar contabilidad profesional, tener soporte al cliente, enviar campañas de email marketing, firmar contratos con propietarios, y generar BI para toma de decisiones.

Se evaluaron dos caminos principales para resolver esto.

## Opciones evaluadas

### Opción A: Stack best-of-breed
- Brevo (email marketing + CRM ligero): $25/mes
- QuickBooks México (contabilidad + CFDI): $30/mes
- Zendesk (soporte): $25/mes
- DocuSign (firmas): $15/mes
- Looker Studio gratis (BI)

**Total**: ~$95-110/mes sin integraciones nativas, Frankenstein de herramientas.

### Opción B: Zoho One (suite unificada)
- 50+ apps integradas, incluyendo CRM, Books, Desk, Campaigns, Sign, Analytics.
- $37-45/usuario/mes (para 3 usuarios: ~$111-135/mes).
- MCP server oficial con Claude para agentes IA.
- Zia (IA propia de Zoho) embebida en cada app.

## Decisión

**Opción B: Zoho One como ERP único.**

Brevo queda en la reserva para Fase 5 como posible reemplazo específico de Zoho Campaigns si las métricas de deliverability no alcanzan objetivo (≥98% inbox, <0.3% bounce).

## Justificación

1. **CFDI 4.0 nativo mexicano**: Zoho Books conectado a PAC certificado emite facturación fiscal correcta. Brevo no tiene módulo contable. Sin CFDI no podemos operar legalmente.
2. **Ecosistema unificado**: CRM + Books + Desk + Sign + Analytics + Campaigns + WorkDrive hablan el mismo idioma de datos.
3. **MCP oficial con Claude**: Anthropic + Zoho tienen integración oficial para que agentes Claude operen sobre toda la suite sin construir wrappers custom.
4. **Zia embebida**: IA transversal en cada app (predictive scoring, sentiment, NLP, anomaly detection).
5. **Precio equivalente**: similar costo que armar Frankenstein, pero mucha menos fricción.
6. **Localización México**: Zoho tiene oficinas en México, soporte en español, integración nativa con PACs.

## Consecuencias

### Positivas
- Datos unificados, sin ETL entre sistemas.
- Facturación CFDI correcta sin herramienta aparte.
- Agentes Claude (Fase 4) conectan oficialmente vía MCP.
- Zoho Analytics consolida Hostex + Books + CRM en dashboards únicos.
- Soporte en español de un solo proveedor.

### Negativas
- Dependencia fuerte de un solo vendor.
- Curva de aprendizaje inicial de la suite (tiene muchas apps).
- UI de Zoho percibida como "menos moderna" que competidores puntuales.
- Zoho Campaigns no es tan potente como Brevo/Mailchimp (por eso la nota de reserva).

### Riesgos
- Si Zoho sube precios drásticamente o deprecia módulos clave, migrar será doloroso.
- Mitigación: mantener datos críticos (reservas, facturas) exportables regularmente.

## Alternativas descartadas

- **Salesforce + NetSuite**: 10x más caro, overkill para este tamaño.
- **HubSpot + QuickBooks**: sin integración nativa, suma mensual mayor.
- **Odoo**: open source atractivo, pero implementación requiere más trabajo técnico.
- **Holded / Bind ERP**: más orientados a España/Europa, menos tracción en México.

## Implementación

Ver `docs/MASTER.md` sección 8 (Zoho One — suite de negocio) para detalles completos.

Fase 2: Zoho CRM activo con pipelines B2C y B2B.
Fase 3: Zoho Books + PAC para CFDI, Zoho Desk, Zoho Campaigns.
Fase 4: MCP oficial con agentes Claude.

## Revisión

Revisar este ADR al cierre de Fase 3 (mes 4-5). KPIs a evaluar:

- Deliverability de Zoho Campaigns (inbox rate, bounce rate).
- Uso real de cada módulo (% de adopción por el equipo).
- Incidencias por bugs o limitaciones de Zoho.
- Comparación de costos reales vs estimados.

Si Campaigns no llega a 98% inbox + <0.3% bounce, evaluar migración parcial a Brevo manteniendo el resto de Zoho.
