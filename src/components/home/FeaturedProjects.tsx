import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllProjects, getProjectCategories } from "@/lib/content";

export function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const projects = useMemo(() => getAllProjects(), []);
  const categories = useMemo(() => getProjectCategories(), []);

  const filteredProjects = useMemo(() => {
    const filtered = activeCategory === "All" 
      ? projects 
      : projects.filter((p) => p.category === activeCategory);
    return filtered.slice(0, 6); // Show max 6 on home page
  }, [projects, activeCategory]);

  return (
    <section className="section-padding">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              A selection of engineering projects demonstrating expertise in
              payments, security, compliance, and AI systems.
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
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

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="card-elevated group opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
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

              {/* Impact */}
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-semibold text-accent">
                  {project.impact}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
