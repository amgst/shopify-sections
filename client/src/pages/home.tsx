import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import productShowcaseImg from "@assets/generated_images/Product_showcase_section_8816f20f.png";
import heroBannerImg from "@assets/generated_images/Hero_banner_section_25f20588.png";
import testimonialsImg from "@assets/generated_images/Testimonials_section_8a78ef44.png";
import newsletterImg from "@assets/generated_images/Newsletter_section_b8bc082f.png";
import collectionGridImg from "@assets/generated_images/Collection_grid_section_e9154ec7.png";

//todo: remove mock functionality - featured sections data
const featuredSections = [
  {
    id: "1",
    title: "Product Showcase Grid",
    category: "Product Display",
    description: "Beautiful grid layout for showcasing your products with hover effects and quick view functionality.",
    thumbnailUrl: productShowcaseImg,
    downloads: 1250,
    isPremium: true,
  },
  {
    id: "2",
    title: "Hero Banner with CTA",
    category: "Hero Sections",
    description: "Eye-catching hero section with customizable call-to-action buttons and overlay effects.",
    thumbnailUrl: heroBannerImg,
    downloads: 2100,
    isPremium: false,
  },
  {
    id: "3",
    title: "Customer Testimonials",
    category: "Social Proof",
    description: "Display customer reviews and testimonials in an elegant, trust-building layout.",
    thumbnailUrl: testimonialsImg,
    downloads: 890,
    isPremium: true,
  },
  {
    id: "4",
    title: "Newsletter Signup",
    category: "Email Marketing",
    description: "Convert visitors into subscribers with this beautifully designed newsletter section.",
    thumbnailUrl: newsletterImg,
    downloads: 1540,
    isPremium: false,
  },
  {
    id: "5",
    title: "Featured Collection",
    category: "Product Display",
    description: "Highlight your best-selling products with this featured collection showcase.",
    thumbnailUrl: collectionGridImg,
    downloads: 1780,
    isPremium: true,
  },
  {
    id: "6",
    title: "Product Grid Advanced",
    category: "Product Display",
    description: "Advanced product grid with filtering, sorting, and quick add-to-cart functionality.",
    thumbnailUrl: productShowcaseImg,
    downloads: 945,
    isPremium: true,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} />
      
      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2" data-testid="text-featured-title">
              Featured Sections
            </h2>
            <p className="text-muted-foreground" data-testid="text-featured-subtitle">
              Hand-picked sections to elevate your store
            </p>
          </div>
          <Link href="/browse" data-testid="link-view-all">
            <Button variant="outline" className="gap-2" data-testid="button-view-all">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredSections.map((section) => (
            <SectionCard key={section.id} {...section} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
