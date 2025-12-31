import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  { id: "payment-orchestration", title: "Payment Orchestration Platform", company: "Enterprise Client", result: "15%+ approval rate lift", description: "Multi-PSP routing engine with intelligent retry logic." },
  { id: "compliance-lims", title: "Compliance-Native LIMS", company: "SYNVRA", result: "SOC2 Type II certified", description: "Laboratory information management with built-in compliance." },
  { id: "revenue-cycle-saas", title: "Revenue Cycle Management", company: "DrsRevenue LLC", result: "$50M+ claims processed", description: "End-to-end medical billing platform." },
];

export default function Work() {
  return (
    <Layout>
      <section className="bg-primary py-20">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Work & Case Studies</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">Detailed case studies of impactful projects and their outcomes.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-wide grid gap-8">
          {caseStudies.map((study, i) => (
            <Link key={study.id} to={`/projects/${study.id}`} className="card-elevated group flex flex-col gap-4 md:flex-row md:items-center md:justify-between opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}>
              <div>
                <p className="text-sm text-muted-foreground">{study.company}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-foreground group-hover:text-accent">{study.title}</h3>
                <p className="mt-2 text-muted-foreground">{study.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-accent">{study.result}</span>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
