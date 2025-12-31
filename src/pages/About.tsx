import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAboutSettings } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import headshot from "@/assets/headshot.png";

export default function About() {
  const settings = getAboutSettings();

  return (
    <Layout>
      <section className="bg-primary py-20">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            {settings.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">
            {settings.pageSubtitle}
          </p>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-12 flex justify-center lg:hidden">
            <img src={headshot} alt="Bilal Ahmed" className="h-48 w-48 rounded-full object-cover ring-4 ring-accent/20 shadow-xl" />
          </div>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 prose-executive">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4 first:mt-0">{children}</h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-2 mb-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-muted-foreground flex gap-2">
                      <span className="text-accent">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                }}
              >
                {settings.bio}
              </ReactMarkdown>
              
              <div className="mt-8 flex gap-4">
                <Link to="/contact">
                  <Button className="gap-2">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/resume">
                  <Button variant="outline">View Resume</Button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="hidden lg:block">
                <img src={headshot} alt="Bilal Ahmed" className="w-full rounded-2xl object-cover ring-4 ring-accent/20 shadow-xl" />
              </div>
              <div className="card-elevated">
                <Briefcase className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold">{settings.currentRoleTitle}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{settings.currentRoleDescription}</p>
              </div>
              <div className="card-elevated">
                <Award className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold">Experience</h3>
                <p className="mt-2 text-sm text-muted-foreground">{settings.experienceSummary}</p>
              </div>
              <div className="card-elevated">
                <GraduationCap className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold">Expertise</h3>
                <p className="mt-2 text-sm text-muted-foreground">{settings.expertiseAreas}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
