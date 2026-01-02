import { Layout } from "@/components/layout/Layout";
import { Mail, Linkedin, Github, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const contacts = [
  { icon: Mail, label: "Email", value: "contact@bilal-ahmed.me", href: "mailto:contact@bilal-ahmed.me" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/bi-ah", href: "https://linkedin.com/in/bi-ah" },
  { icon: Github, label: "GitHub", value: "github.com/bi-ah", href: "https://github.com/bi-ah" },
  { icon: MessageCircle, label: "WhatsApp", value: "+92 (333) 860-6269", href: "https://wa.me/923338606269" },
  { icon: Phone, label: "Phone", value: "+92 (333) 860-6269", href: "tel:+923338606269" },
];

export default function Contact() {
  return (
    <Layout>
      <section className="bg-primary py-20">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">Get in Touch</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">Open to consulting, advisory roles, and building interesting things together.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact, i) => (
              <a key={contact.label} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="card-elevated group flex items-start gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-accent-foreground">
                  <contact.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{contact.label}</p>
                  <p className="mt-1 font-medium text-foreground group-hover:text-accent">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h2 className="font-display text-2xl font-bold">Prefer a Quick Message?</h2>
            <p className="mt-2 text-muted-foreground">Email is the fastest way to reach me for professional inquiries.</p>
            <a href="mailto:bilal@synvra.com"><Button size="lg" className="mt-6 gap-2"><Mail className="h-4 w-4" />Send an Email</Button></a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
