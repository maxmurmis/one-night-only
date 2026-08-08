import Link from "next/link";
import { NavBar } from "./NavBar";

export function Shell({
  children,
  active,
  title,
  right,
}: {
  children: React.ReactNode;
  active?: "matches" | "comparar" | "beneficios" | "perfil";
  title?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[rgba(8,5,10,0.82)] px-4 py-3 backdrop-blur-xl">
        <Link href="/matches" className="flex items-center gap-2">
          <span className="display text-2xl leading-none text-[var(--color-neon)] glow-neon">
            MOVIE
          </span>
          <span className="display text-2xl leading-none text-[var(--color-cream)]">MATCH</span>
        </Link>
        {right ?? (
          <span className="chip border-[rgba(255,45,99,0.4)] text-[var(--color-neon-soft)]">
            27 AGO
          </span>
        )}
      </header>

      {title ? (
        <div className="px-4 pt-5">
          <h1 className="display text-4xl text-[var(--color-cream)]">{title}</h1>
        </div>
      ) : null}

      <main className="flex-1 px-4 pb-28 pt-4">{children}</main>

      {active ? <NavBar active={active} /> : null}
    </div>
  );
}
