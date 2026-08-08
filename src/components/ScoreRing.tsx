export function ScoreRing({
  score,
  size = 200,
  label,
  animate = true,
}: {
  score: number;
  size?: number;
  label?: string;
  animate?: boolean;
}) {
  const stroke = size * 0.075;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;

  // El color acompaña al escalón: dorado arriba de 85, neón en el medio,
  // violeta abajo — así el número se lee antes de leerlo.
  const color = score >= 85 ? "#ffc857" : score >= 60 ? "#ff2d63" : "#a855f7";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className={animate ? "pop" : undefined}>
        <defs>
          <linearGradient id={`g-${score}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={score >= 85 ? "#ff9d2e" : "#ff6b93"} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#g-${score})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 ${size * 0.06}px ${color}aa)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="display leading-none"
          style={{ fontSize: size * 0.36, color }}
        >
          {score}
          <span style={{ fontSize: size * 0.16 }}>%</span>
        </span>
        {label ? (
          <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-dim)]">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
