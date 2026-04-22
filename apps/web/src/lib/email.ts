import { Resend } from 'resend';
import type { Reservation } from '@/types/db';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'reservas@mobbitrips.com';
const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5212282525244';

export async function sendReservationConfirmation(reservation: Reservation, propertyName: string) {
  const { guest_name, guest_email, check_in_date, check_out_date, guests, total_mxn, id } =
    reservation;

  const waMsg = encodeURIComponent(
    `Hola, soy ${guest_name}. Acabo de solicitar una reserva (${id.slice(0, 8)}) para ${propertyName} del ${check_in_date} al ${check_out_date}. ¿Me pueden confirmar?`,
  );

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Inter,sans-serif;background:#FAF8F5;margin:0;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(237,104,100,.10)">
    <div style="background:#ED6864;padding:32px 24px;text-align:center">
      <h1 style="color:#fff;font-size:24px;margin:0;font-family:Comfortaa,sans-serif">¡Solicitud recibida!</h1>
      <p style="color:rgba(255,255,255,.85);margin:8px 0 0;font-size:14px">Te contactaremos pronto para confirmar tu reserva</p>
    </div>
    <div style="padding:32px 24px">
      <p style="color:#3D3D3D;font-size:16px;margin:0 0 24px">Hola <strong>${guest_name}</strong>, recibimos tu solicitud de reserva. Aquí está el resumen:</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#3D3D3D">
        <tr><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;color:#706F6F">Propiedad</td><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;text-align:right;font-weight:600">${propertyName}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;color:#706F6F">Entrada</td><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;text-align:right;font-weight:600">${check_in_date}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;color:#706F6F">Salida</td><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;text-align:right;font-weight:600">${check_out_date}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;color:#706F6F">Huéspedes</td><td style="padding:10px 0;border-bottom:1px solid #EDE9E4;text-align:right;font-weight:600">${guests}</td></tr>
        <tr><td style="padding:10px 0;color:#706F6F">Total</td><td style="padding:10px 0;text-align:right;font-weight:700;color:#ED6864;font-size:18px">$${total_mxn.toLocaleString('es-MX')} MXN</td></tr>
      </table>
      <div style="margin:28px 0;text-align:center">
        <a href="https://wa.me/${WA}?text=${waMsg}" style="display:inline-block;background:#ED6864;color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:600;font-size:15px">Escríbenos por WhatsApp</a>
      </div>
      <p style="color:#A8A8A8;font-size:13px;text-align:center;margin:0">Folio: ${id.slice(0, 8).toUpperCase()} · Mobbitrips · México</p>
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: guest_email,
    subject: `✅ Solicitud de reserva — ${propertyName}`,
    html,
  });
}
