import { Helmet } from "react-helmet-async";
import { getSEOSettings } from "@/lib/content";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({ title, description, image, url, type = "website" }: SEOHeadProps) {
  const seo = getSEOSettings();
  
  const pageTitle = title ? `${title} | ${seo.author}` : seo.siteTitle;
  const pageDescription = description || seo.siteDescription;
  const pageImage = image || `${seo.siteUrl}${seo.ogImage}`;
  const pageUrl = url || seo.siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={seo.author} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {seo.twitterHandle && <meta name="twitter:creator" content={seo.twitterHandle} />}
      
      {/* Theme Color */}
      <meta name="theme-color" content={seo.themeColor} />
    </Helmet>
  );
}
