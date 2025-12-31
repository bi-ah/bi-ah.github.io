import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MessageCircle, Settings } from "lucide-react";
import { getSiteSettings } from "@/lib/content";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const settings = getSiteSettings();

  const socialLinks = [
    {
      label: "LinkedIn",
      href: settings.linkedinUrl,
      icon: Linkedin,
    },
    {
      label: "GitHub",
      href: settings.githubUrl,
      icon: Github,
    },
    {
      label: "Email",
      href: `mailto:${settings.email}`,
      icon: Mail,
    },
    ...(settings.whatsappNumber
      ? [
          {
            label: "WhatsApp",
            href: `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`,
            icon: MessageCircle,
          },
        ]
      : []),
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-wide section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="font-display text-xl font-bold text-foreground"
            >
              {settings.authorName}
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {settings.siteDescription}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  {settings.email}
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Open to
                </span>
                <p className="mt-1 text-sm text-foreground">
                  Consulting, Advisory & Leadership Roles
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {settings.authorName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/cms-setup"
              className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-accent transition-colors"
            >
              <Settings className="h-3 w-3" />
              CMS Setup
            </Link>
            <a
              href="/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/60 hover:text-accent transition-colors"
            >
              Admin
            </a>
            <span className="text-xs text-muted-foreground/60">
              Built with React & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
