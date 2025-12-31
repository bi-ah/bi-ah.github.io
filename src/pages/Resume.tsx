import { Layout } from "@/components/layout/Layout";
import { Download, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResumeSettings } from "@/lib/content";

export default function Resume() {
  const settings = getResumeSettings();

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
        <div className="container-narrow">
          <div className="card-elevated mb-8">
            <h2 className="font-display text-xl font-bold">Executive Summary</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {settings.executiveSummary}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {settings.resumePdf && (
              <a href={settings.resumePdf} download>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF Resume
                </Button>
              </a>
            )}
            {!settings.resumePdf && (
              <Button className="gap-2" disabled>
                <Download className="h-4 w-4" />
                Download PDF Resume
              </Button>
            )}
            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Linkedin className="h-4 w-4" />
                View LinkedIn
              </Button>
            </a>
          </div>
          
          {settings.resumePdf ? (
            <div className="mt-12 rounded-xl overflow-hidden border border-border">
              <iframe
                src={settings.resumePdf}
                className="w-full h-[800px]"
                title="Resume PDF"
              />
            </div>
          ) : (
            <div className="mt-12 rounded-xl border-2 border-dashed border-border bg-secondary/30 p-12 text-center">
              <p className="text-muted-foreground">
                Upload your resume PDF via the CMS admin at <code className="bg-secondary px-2 py-1 rounded">/admin/</code>
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
