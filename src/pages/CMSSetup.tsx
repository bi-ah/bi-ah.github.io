import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle, ExternalLink, Github, Copy, Terminal, Settings, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CMSSetup() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <Layout>
      <section className="bg-primary py-20">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            CMS Setup Guide
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">
            Complete guide to set up Decap CMS with GitHub authentication for your portfolio.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          {/* Overview */}
          <div className="card-elevated mb-8">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <Settings className="h-5 w-5 text-accent" />
              What You Get
            </h2>
            <ul className="mt-4 space-y-2">
              {[
                "Git-backed CMS that commits directly to your repository",
                "No database required - content stored as JSON files",
                "Manage blog posts, projects, pages, and site settings",
                "Beautiful admin UI at /admin/",
                "Works perfectly with GitHub Pages",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 1 */}
          <div className="card-elevated mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                1
              </span>
              <h3 className="font-display text-lg font-bold">Update Repository Name</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Edit <code className="bg-secondary px-2 py-1 rounded">public/admin/config.yml</code> and update the repo field:
            </p>
            <div className="relative">
              <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO  # e.g., bi-ah/bi-ah.github.io
  branch: main`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(`backend:\n  name: github\n  repo: YOUR_USERNAME/YOUR_REPO\n  branch: main`, 1)}
                className="absolute top-2 right-2 p-2 rounded bg-background/50 hover:bg-background transition-colors"
              >
                {copiedStep === 1 ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-elevated mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                2
              </span>
              <h3 className="font-display text-lg font-bold">Set Up GitHub OAuth App</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Create an OAuth App in GitHub to enable CMS authentication:
            </p>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-foreground">a.</span>
                <span>
                  Go to{" "}
                  <a
                    href="https://github.com/settings/developers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline inline-flex items-center gap-1"
                  >
                    GitHub Developer Settings
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground">b.</span>
                <span>Click "New OAuth App"</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-foreground">c.</span>
                <span>Fill in the details:</span>
              </li>
            </ol>
            <div className="mt-4 bg-secondary p-4 rounded-lg space-y-2 text-sm">
              <p><strong>Application name:</strong> My Portfolio CMS</p>
              <p><strong>Homepage URL:</strong> https://your-site.com</p>
              <p><strong>Authorization callback URL:</strong> https://api.netlify.com/auth/done</p>
            </div>
            <p className="mt-4 text-muted-foreground">
              Save the <strong>Client ID</strong> and <strong>Client Secret</strong> for the next step.
            </p>
          </div>

          {/* Step 3 */}
          <div className="card-elevated mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                3
              </span>
              <h3 className="font-display text-lg font-bold">Deploy OAuth Gateway</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              You need an OAuth gateway to handle GitHub authentication. Choose one option:
            </p>

            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Key className="h-4 w-4 text-accent" />
                  Option A: Use Netlify (Recommended)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  If you deploy to Netlify, enable Netlify Identity and Git Gateway:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Go to your Netlify site → Settings → Identity</li>
                  <li>2. Enable Identity and set registration to "Invite only"</li>
                  <li>3. Under Identity → Services, enable Git Gateway</li>
                  <li>4. Invite yourself via email</li>
                </ol>
                <p className="text-sm text-muted-foreground mt-3">
                  Then update <code className="bg-secondary px-1 rounded">config.yml</code>:
                </p>
                <pre className="bg-secondary p-3 rounded text-xs mt-2 overflow-x-auto">
                  <code>{`backend:
  name: git-gateway
  branch: main`}</code>
                </pre>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Github className="h-4 w-4 text-accent" />
                  Option B: Self-hosted OAuth Gateway
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Deploy your own OAuth server using this one-click Netlify deploy:
                </p>
                <a
                  href="https://github.com/vencax/netlify-cms-github-oauth-provider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  netlify-cms-github-oauth-provider
                </a>
                <p className="text-sm text-muted-foreground mt-3">
                  After deploying, update <code className="bg-secondary px-1 rounded">config.yml</code>:
                </p>
                <pre className="bg-secondary p-3 rounded text-xs mt-2 overflow-x-auto">
                  <code>{`backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO
  branch: main
  base_url: https://YOUR-OAUTH-APP.netlify.app`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card-elevated mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                4
              </span>
              <h3 className="font-display text-lg font-bold">Access the CMS</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Once configured, access the CMS at:
            </p>
            <div className="flex items-center gap-2">
              <code className="bg-secondary px-4 py-2 rounded-lg text-accent">
                https://your-site.com/admin/
              </code>
              <Link to="/admin/" target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  Open Admin
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Content Structure */}
          <div className="card-elevated mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="h-6 w-6 text-accent" />
              <h3 className="font-display text-lg font-bold">Content Structure</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your content is stored in <code className="bg-secondary px-2 py-1 rounded">src/content/</code>:
            </p>
            <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`src/content/
├── posts/           # Blog posts (JSON)
│   ├── payment-orchestration-guide.json
│   └── compliance-native-saas.json
├── projects/        # Project case studies (JSON)
│   ├── payment-orchestration.json
│   └── compliance-lims.json
├── pages/           # Custom pages (JSON)
└── settings/        # Site configuration
    ├── site.json    # General settings
    ├── hero.json    # Hero section
    ├── about.json   # About page
    ├── resume.json  # Resume page
    └── proof-strip.json  # Metrics strip`}</code>
            </pre>
          </div>

          {/* Quick Tips */}
          <div className="card-elevated">
            <h3 className="font-display text-lg font-bold mb-4">Quick Tips</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Changes made in the CMS are committed directly to your GitHub repo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>You can also edit JSON files directly in your code editor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Images uploaded via CMS go to <code className="bg-secondary px-1 rounded">public/uploads/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>The site rebuilds automatically when you save changes</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Ready to manage your content?</p>
            <div className="flex justify-center gap-4">
              <Link to="/admin/" target="_blank">
                <Button className="gap-2">
                  Open CMS Admin
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
