// ─────────────────────────────────────────────────────────────────────────
// Site-wide contact details. Edit these once and they flow through the whole
// site (WhatsApp float button, CTAs, footer, mailto links).
//
// WHATSAPP_NUMBER is international format, digits only, no "+" or spaces.
//     e.g. South Africa 063 519 0807  →  "27635190807"
// ─────────────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = '27635190807'; // 063 519 0807 in international format
export const CONTACT_EMAIL = 'kenganautomations@outlook.com';

// Pre-filled message when someone taps the floating WhatsApp button.
export const WHATSAPP_GREETING =
  "Hi KenganAutomation — I'd like to chat about automating my lead process.";

export const whatsappLink = (message = WHATSAPP_GREETING) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
