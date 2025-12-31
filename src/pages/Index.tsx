import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ProofStrip } from "@/components/home/ProofStrip";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LatestBlog } from "@/components/home/LatestBlog";
import { CTABand } from "@/components/home/CTABand";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProofStrip />
      <FeaturedProjects />
      <LatestBlog />
      <CTABand />
    </Layout>
  );
};

export default Index;
