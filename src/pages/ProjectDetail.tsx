import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getAllProjects, type Project } from "@/lib/content";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectBySlug(id || "");
  const allProjects = getAllProjects();

  if (!project) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-narrow text-center">
            <h1 className="font-display text-3xl font-bold">Project Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              The project you're looking for doesn't exist.
            </p>
            <Link to="/projects">
              <Button className="mt-6">View All Projects</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const relatedProjects = allProjects.filter((p) => p.slug !== id).slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container-wide">
          <Link
            to="/projects"
            className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-primary-foreground/60">
              <Calendar className="h-4 w-4" />
              {project.timeline}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-primary-foreground/70">
            {project.fullDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <User className="h-4 w-4" />
              <span className="text-sm">{project.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Problem */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  The Problem
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>
              </div>

              {/* Constraints */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Constraints
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.constraints}
                </p>
              </div>

              {/* Approach */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Approach
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.approach}
                </p>
              </div>

              {/* Architecture placeholder */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Architecture / System Design
                </h2>
                <div className="mt-4 flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30">
                  <p className="text-sm text-muted-foreground">
                    [Architecture diagram placeholder - Add system design visual here]
                  </p>
                </div>
              </div>

              {/* Tradeoffs */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Tradeoffs
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.tradeoffs}
                </p>
              </div>

              {/* Execution */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Execution
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.execution}
                </p>
              </div>

              {/* Outcomes */}
              <div className="mb-12 rounded-xl bg-success/10 p-6">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Outcomes
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-foreground">
                  {project.outcomes}
                </p>
              </div>

              {/* What I'd Improve */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  What I'd Improve Next
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.whatIdImprove}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Quick info card */}
                <div className="card-elevated">
                  <h3 className="font-display font-semibold text-foreground">
                    Quick Info
                  </h3>

                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Role
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {project.role}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Timeline
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {project.timeline}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Key Impact
                      </p>
                      <p className="mt-1 font-semibold text-accent">
                        {project.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="card-elevated">
                  <h3 className="font-display font-semibold text-foreground">
                    Tech Stack
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="card-elevated">
                  <h3 className="font-display font-semibold text-foreground">
                    Links
                  </h3>
                  <div className="mt-4 space-y-2">
                    {project.githubLink ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-accent transition-colors hover:underline"
                      >
                        <Github className="h-4 w-4" />
                        <span>View on GitHub</span>
                      </a>
                    ) : (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Github className="h-4 w-4" />
                        <span>GitHub (Private)</span>
                      </p>
                    )}
                    {project.demoLink ? (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-accent transition-colors hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ExternalLink className="h-4 w-4" />
                        <span>Demo (Coming Soon)</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More projects */}
      <section className="border-t border-border section-padding bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-foreground">
            More Projects
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="card-elevated group">
                <span className="tag tag-accent">{p.category}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
