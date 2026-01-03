import { Layout } from "@/components/layout/Layout";
import { Mail, Linkedin, Github, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContactSettings, getSiteSettings } from "@/lib/content";

export default function Contact() {
  const contactSettings = getContactSettings();
  const siteSettings = getSiteSettings();

  const contacts = [
    { icon: Mail, label: "Email", value: siteSettings.email, href: `mailto:${siteSettings.email}` },
    { icon: Linkedin, label: "LinkedIn", value: siteSettings.linkedinUrl.replace("https://", ""), href: siteSettings.linkedinUrl },
    { icon: Github, label: "GitHub", value: siteSettings.githubUrl.replace("https://", ""), href: siteSettings.githubUrl },
    ...(siteSettings.whatsappNumber ? [{ icon: MessageCircle, label: "WhatsApp", value: siteSettings.whatsappNumber, href: `https://wa.me/${siteSettings.whatsappNumber.replace(/\D/g, '')}` }] : []),
    ...(siteSettings.whatsappNumber ? [{ icon: Phone, label: "Phone", value: siteSettings.whatsappNumber, href: `tel:${siteSettings.whatsappNumber}` }] : []),
  ];

  return (
    <Layout>
      <section className="bg-primary py-20">
        <div className="container-wide">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">{contactSettings.pageTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">{contactSettings.pageSubtitle}</p>
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
            <h2 className="font-display text-2xl font-bold">{contactSettings.ctaTitle}</h2>
            <p className="mt-2 text-muted-foreground">{contactSettings.ctaSubtitle}</p>
            <a href={`mailto:${siteSettings.email}`}><Button size="lg" className="mt-6 gap-2"><Mail className="h-4 w-4" />{contactSettings.ctaButtonText}</Button></a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
