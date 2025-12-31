import { TrendingUp, Shield, Server, Award, Briefcase } from "lucide-react";
import { getProofStripSettings } from "@/lib/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Approval Rate Lift": TrendingUp,
  "Decline Reduction": Shield,
  "Claims Processed": Server,
  "Type II Certified": Award,
  "Years Experience": Briefcase,
};

export function ProofStrip() {
  const settings = getProofStripSettings();

  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container-wide py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {settings.items.map((item, index) => {
            const Icon = iconMap[item.label] || TrendingUp;
            return (
              <div
                key={item.label}
                className="group flex items-start gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {item.metric}
                  </p>
                  <p className="font-medium text-muted-foreground">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
