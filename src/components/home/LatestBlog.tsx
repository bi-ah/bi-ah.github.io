import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllPosts, formatDate } from "@/lib/content";

export function LatestBlog() {
  const posts = useMemo(() => getAllPosts().slice(0, 3), []);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Latest Insights
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Thoughts on engineering leadership, fintech architecture, security
              best practices, and the future of AI-powered systems.
            </p>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Blog posts grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card-elevated group opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* Category */}
              <span className="tag tag-accent">{post.category}</span>

              {/* Title */}
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground group-hover:text-accent">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
