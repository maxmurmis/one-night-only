const PALETTE = ["#ff2d63", "#a855f7", "#ffc857", "#4ade9b", "#ff6b93", "#5b8dff"];

function hue(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export function Avatar({
  src,
  name,
  size = 48,
}: {
  src: string | null;
  name: string;
  size?: number;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  if (src) {
    return (
      // Avatares de Google: <img> plano a propósito, para no tener que declarar
      // el dominio en next.config ni pasar por el optimizador en cada deploy.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        className="shrink-0 rounded-full border border-[var(--color-line)] object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const color = hue(name);
  return (
    <div
      className="display flex shrink-0 items-center justify-center rounded-full border"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        color,
        borderColor: `${color}55`,
        background: `${color}1f`,
      }}
    >
      {initials || "?"}
    </div>
  );
}
