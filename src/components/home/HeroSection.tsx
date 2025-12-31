import { Link } from "react-router-dom";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteSettings, getHeroSettings } from "@/lib/content";

export function HeroSection() {
  const siteSettings = getSiteSettings();
  const heroSettings = getHeroSettings();

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-primary">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, hsl(220 60% 20% / 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(4 90% 58% / 0.1) 0%, transparent 40%)",
        }}
      />

      <div className="container-wide relative z-10 flex min-h-[90vh] flex-col justify-center py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          {siteSettings.availableForWork && (
            <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-1.5 text-sm text-primary-foreground/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              </span>
              {siteSettings.availabilityMessage}
            </div>
          )}

          {/* Main heading */}
          <h1 className="animate-fade-in animation-delay-100 font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Building secure,
            <br />
            <span className="gradient-text">scalable systems</span>
            <br />
            that drive results
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in animation-delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
            {heroSettings.subheadline}
          </p>

          {/* CTAs */}
          <div className="animate-fade-in animation-delay-300 mt-10 flex flex-wrap gap-4">
            <Link to={heroSettings.primaryCtaLink}>
              <Button size="lg" className="btn-hero-primary gap-2">
                {heroSettings.primaryCtaText}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={heroSettings.secondaryCtaLink}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Download className="mr-2 h-4 w-4" />
                {heroSettings.secondaryCtaText}
              </Button>
            </Link>
          </div>

          {/* Secondary links */}
          <div className="animate-fade-in animation-delay-400 mt-8 flex flex-wrap gap-6 text-sm">
            <Link
              to="/projects"
              className="link-underline text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              View Projects →
            </Link>
            <Link
              to="/work"
              className="link-underline text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              Case Studies →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="h-6 w-6 text-primary-foreground/40" />
        </div>
      </div>
    </section>
  );
}
