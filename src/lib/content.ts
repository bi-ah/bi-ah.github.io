// Content loader utilities for file-based CMS
// These modules load content from JSON files in src/content/

// Import all content files using Vite's glob import
const postModules = import.meta.glob('/src/content/posts/*.json', { eager: true });
const projectModules = import.meta.glob('/src/content/projects/*.json', { eager: true });
const settingsModules = import.meta.glob('/src/content/settings/*.json', { eager: true });

// Types
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featuredImage?: string;
  body: string;
  published: boolean;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  problem: string;
  constraints: string;
  approach: string;
  tradeoffs: string;
  execution: string;
  outcomes: string;
  role: string;
  category: string;
  stack: string[];
  timeline: string;
  impact: string;
  whatIdImprove: string;
  featuredImage?: string;
  githubLink?: string;
  demoLink?: string;
  order?: number;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  authorName: string;
  authorTitle: string;
  authorTagline: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  whatsappNumber?: string;
  availableForWork: boolean;
  availabilityMessage: string;
}

export interface HeroSettings {
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface AboutSettings {
  pageTitle: string;
  pageSubtitle: string;
  bio: string;
  currentRoleTitle: string;
  currentRoleDescription: string;
  experienceSummary: string;
  expertiseAreas: string;
}

export interface ResumeSettings {
  pageTitle: string;
  pageSubtitle: string;
  executiveSummary: string;
  resumePdf?: string;
  linkedinUrl: string;
}

export interface ProofStripSettings {
  items: Array<{ metric: string; label: string }>;
}

// Helper to extract content from modules
function extractContent<T>(modules: Record<string, unknown>): T[] {
  return Object.values(modules).map((module) => (module as { default?: T }) || module) as T[];
}

// Load all blog posts
export function getAllPosts(): BlogPost[] {
  const posts = Object.values(postModules) as BlogPost[];
  return posts
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Load single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

// Load all projects
export function getAllProjects(): Project[] {
  const projects = Object.values(projectModules) as Project[];
  return projects.sort((a, b) => (a.order || 0) - (b.order || 0));
}

// Load single project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((project) => project.slug === slug);
}

// Load settings
export function getSiteSettings(): SiteSettings {
  return settingsModules['/src/content/settings/site.json'] as SiteSettings;
}

export function getHeroSettings(): HeroSettings {
  return settingsModules['/src/content/settings/hero.json'] as HeroSettings;
}

export function getAboutSettings(): AboutSettings {
  return settingsModules['/src/content/settings/about.json'] as AboutSettings;
}

export function getResumeSettings(): ResumeSettings {
  return settingsModules['/src/content/settings/resume.json'] as ResumeSettings;
}

export function getProofStripSettings(): ProofStripSettings {
  return settingsModules['/src/content/settings/proof-strip.json'] as ProofStripSettings;
}

// Get unique categories
export function getPostCategories(): string[] {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return ['All', ...categories];
}

export function getProjectCategories(): string[] {
  const projects = getAllProjects();
  const categories = [...new Set(projects.map((project) => project.category))];
  return ['All', ...categories];
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
