import Link from "next/link";

const ITEMS = [
  { key: "matches", href: "/matches", label: "Matches", icon: "🎯" },
  { key: "comparar", href: "/comparar", label: "Comparar", icon: "🔍" },
  { key: "beneficios", href: "/beneficios", label: "Premios", icon: "🍿" },
  { key: "perfil", href: "/perfil", label: "Perfil", icon: "🎟️" },
] as const;

export function NavBar({ active }: { active: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-lg border-t border-[var(--color-line)] bg-[rgba(8,5,10,0.9)] px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <ul className="flex items-stretch justify-around">
        {ITEMS.map((it) => {
          const on = it.key === active;
          return (
            <li key={it.key} className="flex-1">
              <Link
                href={it.href}
                className="flex flex-col items-center gap-0.5 py-2.5 text-[0.68rem] font-semibold tracking-wide uppercase transition-colors"
                style={{ color: on ? "var(--color-neon)" : "var(--color-dim)" }}
              >
                <span className="text-lg leading-none" style={{ opacity: on ? 1 : 0.55 }}>
                  {it.icon}
                </span>
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
