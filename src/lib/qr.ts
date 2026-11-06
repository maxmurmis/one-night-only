import QRCode from "qrcode";

/** QR del perfil como data-URL, para escanear en la fila del cine. */
export async function qrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 460,
    errorCorrectionLevel: "M",
    color: { dark: "#242424", light: "#ffffffff" },
  });
}
