import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="display text-5xl">This page took a wrong turn</h1>
      <p className="mt-4 text-lg text-ink-soft">The page you were looking for isn&apos;t here.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="inline-flex min-h-12 items-center rounded bg-onyx px-6 font-semibold text-tunic">
          Go to the home page
        </Link>
        <Link href="/book" className="inline-flex min-h-12 items-center rounded border-2 border-onyx px-6 font-semibold">
          Book a chair
        </Link>
      </div>
    </div>
  );
}
