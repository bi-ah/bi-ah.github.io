import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllProjects, getProjectCategories, getProjectsPageSettings } from "@/lib/content";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = useMemo(() => getAllProjects(), []);
  const categories = useMemo(() => getProjectCategories(), []);
  const pageSettings = useMemo(() => getProjectsPageSettings(), []);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            {pageSettings.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">
            {pageSettings.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="card-elevated group opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "forwards",
                }}
              >
                {/* Category badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="tag tag-accent">{project.category}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                </div>

                {/* Title & description */}
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

                {/* Role */}
                <p className="mt-4 text-sm font-medium text-foreground">
                  {project.role}
                </p>

                {/* Stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-secondary px-2 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="rounded bg-secondary px-2 py-1 text-xs text-muted-foreground">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Impact & Timeline */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="font-semibold text-accent">
                    {project.impact}
                  </span>
                  <span className="text-muted-foreground">{project.timeline}</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setActiveCategory("All")}
              >
                View All Projects
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
