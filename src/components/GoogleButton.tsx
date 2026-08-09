export function GoogleButton({ label, next }: { label: string; next?: string }) {
  const href = next ? `/api/auth/login?next=${encodeURIComponent(next)}` : "/api/auth/login";
  return (
    <a href={href} className="btn btn-primary w-full text-base">
      <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#fff"
          d="M44.5 20H24v8.5h11.8C34.7 33.4 30.1 36.5 24 36.5c-6.9 0-12.5-5.6-12.5-12.5S17.1 11.5 24 11.5c3.1 0 5.9 1.1 8.1 3l6.2-6.2C34.5 4.7 29.5 2.5 24 2.5 12.1 2.5 2.5 12.1 2.5 24S12.1 45.5 24 45.5c11 0 20.5-8 20.5-21.5 0-1.4-.2-2.7-.5-4z"
        />
      </svg>
      {label}
    </a>
  );
}
