import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-semibold text-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
