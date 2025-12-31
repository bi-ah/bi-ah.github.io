import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { getPostBySlug, formatDate } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const { id } = useParams();
  const post = getPostBySlug(id || "");
  
  if (!post) {
    return (
      <Layout>
        <div className="section-padding container-narrow text-center">
          <h1 className="text-2xl font-bold">Post Not Found</h1>
          <Link to="/blog" className="mt-4 inline-block text-accent hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        <header className="bg-primary py-20">
          <div className="container-narrow">
            <Link 
              to="/blog" 
              className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-6 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>
        
        <div className="section-padding">
          <div className="container-narrow">
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">{post.excerpt}</p>
            
            <div className="prose-executive prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-muted-foreground">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-6">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
