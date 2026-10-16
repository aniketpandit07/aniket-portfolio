"use client";

import { Moon, Sun } from "lucide-react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const links = [
  { label: "Work", href: "/#work", section: "work" },
  { label: "Expertise", href: "/#expertise", section: "expertise" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

type Theme = "dark" | "light";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<Theme | null>(null);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const lenis = useLenis();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 28);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const items = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []).filter((item) => item.getClientRects().length > 0);
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    lenis?.stop();
    const frame = requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>('#mobile-navigation a')?.focus());
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(frame);
      lenis?.start();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen, lenis]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = links
      .map((link) => document.getElementById(link.section))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.01, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, section: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setIsMenuOpen(false);
    if (pathname !== "/") return;
    const target = document.getElementById(section);
    if (!target) return;

    event.preventDefault();
    setActiveSection(section);
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, {
        offset: -88,
        duration: reduceMotion ? 0 : 0.72,
        immediate: Boolean(reduceMotion),
        easing: (value) => 1 - Math.pow(1 - value, 3),
      });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
    window.history.replaceState(null, "", `#${section}`);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.classList.add("theme-transition");
    document.documentElement.dataset.theme = nextTheme;
    try { window.localStorage.setItem("portfolio-theme", nextTheme); } catch { /* Theme still works when storage is unavailable. */ }
    setTheme(nextTheme);
    window.setTimeout(() => document.documentElement.classList.remove("theme-transition"), 260);
  }

  const resolvedTheme = theme ?? "dark";
  const themeLabel = resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 min-[360px]:px-3 min-[360px]:pt-3 sm:px-6 sm:pt-5">
      <motion.nav
        aria-label="Primary navigation"
        className={`pointer-events-auto relative z-50 mx-auto flex max-w-[var(--container-max)] items-center justify-between gap-3 rounded-full border px-3 transition-[background-color,border-color,box-shadow,padding] duration-300 sm:px-6 ${
          isScrolled
            ? "border-line/70 bg-panel/80 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-transparent bg-transparent py-3.5"
        }`}
      >
        <Link
          className="relative z-50 font-display text-xs font-bold tracking-[-0.02em] text-foreground outline-none transition-colors hover:text-accent-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent-primary min-[360px]:text-sm"
          href="/#top"
          aria-label="Aniket Pandit - home"
          onClick={(event) => handleNavigation(event, "top")}
        >
          ANIKET<span className="text-accent-primary">.</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link, index) => (
            <Link
              aria-current={activeSection === link.section ? "location" : undefined}
              className={`group relative py-2 font-mono text-[0.61rem] uppercase tracking-[0.13em] outline-none transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent-primary lg:text-[0.65rem] ${activeSection === link.section ? "text-foreground" : "text-muted"}`}
              href={link.href}
              key={link.label}
              onClick={(event) => handleNavigation(event, link.section)}
            >
              <span className={`mr-1 text-[0.52rem] ${activeSection === link.section ? "text-accent-primary" : "text-muted/50"}`}>0{index + 1}</span>
              {link.label}
              <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent-primary transition-transform duration-200 ${activeSection === link.section ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </Link>
          ))}
        </div>

        <div className="relative z-50 flex items-center gap-1.5">
          <button
            aria-label={themeLabel}
            className="grid size-9 place-items-center rounded-full border border-line/70 bg-panel/70 text-muted outline-none transition-[color,border-color,background-color] hover:border-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-primary min-[360px]:size-10"
            onClick={toggleTheme}
            title={themeLabel}
            type="button"
          >
            {resolvedTheme === "dark" ? <Sun aria-hidden="true" className="size-3.5 min-[360px]:size-4" /> : <Moon aria-hidden="true" className="size-3.5 min-[360px]:size-4" />}
          </button>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            ref={menuButtonRef}
            className="flex min-h-11 min-w-12 items-center justify-center font-mono text-[0.58rem] uppercase tracking-[0.12em] text-foreground outline-none transition-colors hover:text-accent-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent-primary min-[360px]:min-w-14 min-[360px]:text-[0.65rem] min-[360px]:tracking-[0.15em] lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="pointer-events-auto fixed inset-0 z-40 flex bg-background px-4 pb-6 pt-20 backdrop-blur-xl min-[360px]:px-6 min-[360px]:pb-8 min-[360px]:pt-24 lg:hidden"
            data-lenis-prevent
            aria-label="Mobile navigation"
            exit={{ opacity: 0 }}
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <div className="mx-auto flex min-h-0 w-full max-w-md flex-col justify-between overflow-y-auto">
              <div className="flex flex-col pb-8">
                {links.map((link, index) => (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.045 }}
                    key={link.label}
                  >
                    <Link
                      aria-current={activeSection === link.section ? "location" : undefined}
                      className={`flex min-h-14 items-baseline gap-3 border-b border-line/70 py-3 font-display text-[clamp(1.45rem,8vw,2.75rem)] font-semibold leading-none tracking-[-0.045em] outline-none transition-colors hover:text-accent-primary focus-visible:text-accent-primary min-[360px]:min-h-16 min-[360px]:gap-4 min-[360px]:py-4 ${activeSection === link.section ? "text-accent-primary" : "text-foreground"}`}
                      href={link.href}
                      onClick={(event) => handleNavigation(event, link.section)}
                    >
                      <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted">0{index + 1}</span>
                      {link.label.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                Full Stack Developer
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
