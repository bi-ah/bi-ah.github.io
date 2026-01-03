import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getAllPosts, getPostCategories, formatDate, getBlogPageSettings, type BlogPost } from "@/lib/content";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const posts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getPostCategories(), []);
  const pageSettings = useMemo(() => getBlogPageSettings(), []);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || post.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  return (
    <Layout>
      <section className="bg-primary py-20">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">{pageSettings.pageTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">
            {pageSettings.pageSubtitle}
          </p>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search posts..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pl-10" 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setCategory(cat)} 
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all", 
                    category === cat 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Link 
                key={post.slug} 
                to={`/blog/${post.slug}`} 
                className="card-elevated group opacity-0 animate-fade-in-up" 
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
              >
                <span className="tag tag-accent">{post.category}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
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
          
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No posts found matching your criteria.</p>
              <button 
                className="mt-4 text-accent hover:underline"
                onClick={() => { setSearch(""); setCategory("All"); }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
