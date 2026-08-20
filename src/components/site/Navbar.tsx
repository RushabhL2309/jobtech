"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { industries, services } from "@/data/site";

function NavItem({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center pb-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] transition xl:text-[0.78rem] xl:tracking-[0.14em] ${
        active ? "text-brand" : "text-ink/75 hover:text-brand"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-brand transition-transform duration-300 ease-out ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(true);
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(false);
  const [ind, setInd] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSvc(false);
    setInd(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const servicesActive = pathname === "/services" || pathname.startsWith("/services/");
  const industriesActive = pathname === "/industries" || pathname.startsWith("/industries/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        solid ? "border-border bg-white/95 shadow-soft backdrop-blur" : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-5 lg:px-8">
        <Link href="/" className="relative block h-9 w-[120px] shrink-0 sm:h-11 sm:w-[148px]" onClick={() => setOpen(false)}>
          <Image
            src="/logo/jobtech-logo.png"
            alt="Jobtech"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 lg:flex xl:gap-x-7">
          <NavItem href="/" active={pathname === "/"}>
            Home
          </NavItem>
          <NavItem href="/about-us" active={pathname.startsWith("/about-us")}>
            About Us
          </NavItem>

          <div className="group relative">
            <NavItem href="/services" active={servicesActive}>
              Services <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </NavItem>
            <div className="invisible absolute left-1/2 top-full z-20 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-xl border border-border bg-white p-2 shadow-lift">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.href}
                    className={`block rounded-lg px-3 py-2 text-sm hover:bg-secondary hover:text-brand ${
                      pathname === s.href ? "bg-secondary text-brand" : "text-ink/80"
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <NavItem href="/industries" active={industriesActive}>
              Industries <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </NavItem>
            <div className="invisible absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-xl border border-border bg-white p-2 shadow-lift">
                {industries.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.href}
                    className={`block rounded-lg px-3 py-2 text-sm hover:bg-secondary hover:text-brand ${
                      pathname === s.href ? "bg-secondary text-brand" : "text-ink/80"
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavItem href="/careers" active={pathname.startsWith("/careers")}>
            Careers
          </NavItem>
          <NavItem href="/contact-us" active={pathname.startsWith("/contact-us")}>
            Contact Us
          </NavItem>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-lg border border-border text-brand lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="max-h-[min(80vh,calc(100svh-4rem))] overflow-y-auto border-t border-border bg-white px-4 py-4 sm:px-5 lg:hidden">
          <div className="flex flex-col gap-1">
            {[
              ["/", "Home"],
              ["/about-us", "About Us"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-lg px-2 py-2.5 text-sm font-medium">
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setSvc((v) => !v)}
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm font-medium"
            >
              Services <ChevronDown className="h-4 w-4" />
            </button>
            {svc
              ? services.map((s) => (
                  <Link key={s.slug} href={s.href} className="rounded-lg px-4 py-2 text-sm text-muted-foreground">
                    {s.title}
                  </Link>
                ))
              : null}
            <button
              type="button"
              onClick={() => setInd((v) => !v)}
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm font-medium"
            >
              Industries <ChevronDown className="h-4 w-4" />
            </button>
            {ind
              ? industries.map((s) => (
                  <Link key={s.slug} href={s.href} className="rounded-lg px-4 py-2 text-sm text-muted-foreground">
                    {s.title}
                  </Link>
                ))
              : null}
            {[
              ["/careers", "Careers"],
              ["/contact-us", "Contact Us"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-lg px-2 py-2.5 text-sm font-medium">
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
