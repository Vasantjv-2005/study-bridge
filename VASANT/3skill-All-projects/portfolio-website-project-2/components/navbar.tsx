// This component is not directly used in app/page.tsx as the header is defined there.
// It's included for completeness if you decide to refactor the header into a separate component.
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/70 dark:bg-slate-950/90 dark:supports-[backdrop-filter]:bg-slate-950/70 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-500 transform hover:scale-105"
        >
          Vasant Jevengekar
        </Link>

        <nav className="hidden md:flex gap-10">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "#about" },
            { name: "Services", href: "#services" },
            { name: "Projects", href: "#projects" },
            { name: "Education", href: "#education" },
            { name: "Certifications", href: "#certifications" },
            { name: "Internships", href: "#internships" },
            { name: "Contact", href: "#contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold transition-all duration-500 hover:text-blue-600 text-slate-700 dark:text-slate-300 dark:hover:text-blue-400 relative group py-2"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
