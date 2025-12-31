import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const opportunities = [
  {
    icon: Briefcase,
    title: "Hiring",
    description: "Looking for a technical leader who can scale teams and systems",
  },
  {
    icon: Users,
    title: "Consulting",
    description: "Need expert guidance on payments, security, or compliance",
  },
  {
    icon: Lightbulb,
    title: "Collaboration",
    description: "Building something interesting in fintech or AI",
  },
];

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background decoration */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, hsl(4 90% 58% / 0.15) 0%, transparent 50%)",
        }}
      />

      <div className="container-wide relative z-10 section-padding">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Let's Build Something Great
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
            Whether you're hiring, seeking technical consulting, or looking for a
            co-builder on your next venture—I'd love to hear from you.
          </p>
        </div>

        {/* Opportunity cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {opportunities.map((item, index) => (
            <div
              key={item.title}
              className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center backdrop-blur-sm transition-all hover:border-primary-foreground/20 hover:bg-primary-foreground/10 opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link to="/contact">
            <Button size="lg" className="btn-hero-primary gap-2">
              Start a Conversation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a
            href="mailto:bilal@synvra.com"
            className="btn-hero-secondary px-6 py-3"
          >
            bilal@synvra.com
          </a>
        </div>
      </div>
    </section>
  );
}
