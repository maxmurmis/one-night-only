import QRCode from "qrcode";

/** QR del perfil como data-URL, para escanear en la fila del cine. */
export async function qrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 460,
    errorCorrectionLevel: "M",
    color: { dark: "#f7f0f4", light: "#08050aff" },
  });
}
