import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSiteSettings } from "@/lib/content";
import logoLight from "@/assets/logo-light-bg.svg";
import logoDark from "@/assets/logo-dark-bg.svg";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const settings = getSiteSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "glass border-b border-border py-3" : "bg-transparent py-5")}>
      <div className="container-wide">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img src={isDark ? logoDark : logoLight} alt={settings.authorName} className="h-8 w-8" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">{settings.authorName}</span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} className={cn("link-underline rounded-md px-3 py-2 text-sm font-medium transition-colors", location.pathname === item.href ? "text-accent" : "text-muted-foreground hover:text-foreground")}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="Toggle theme">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="animate-fade-in-down mt-4 rounded-xl border border-border bg-card p-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className={cn("rounded-lg px-4 py-3 text-sm font-medium transition-colors", location.pathname === item.href ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
