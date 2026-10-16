import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-svh place-items-center px-6 text-center"><div><p className="font-mono text-label text-accent-secondary">404 / Page not found</p><h1 className="mt-5 font-display text-h1 font-semibold tracking-tight">Let’s head home.</h1><p className="mt-4 text-muted">This page doesn’t exist. You can explore my work from the homepage.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent-primary px-6 text-white">Back to home</Link></div></main>;
}
