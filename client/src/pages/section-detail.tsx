import { useState } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import productShowcaseImg from "@assets/generated_images/Product_showcase_section_8816f20f.png";
import heroBannerImg from "@assets/generated_images/Hero_banner_section_25f20588.png";
import testimonialsImg from "@assets/generated_images/Testimonials_section_8a78ef44.png";
import newsletterImg from "@assets/generated_images/Newsletter_section_b8bc082f.png";

//todo: remove mock functionality - section details data
const sectionDetails: Record<string, any> = {
  "1": {
    id: "1",
    title: "Product Showcase Grid",
    category: "Product Display",
    description: "A beautifully designed product showcase grid that displays your products in an elegant, organized manner. This section features smooth hover effects, quick view functionality, and is fully responsive across all devices. Perfect for highlighting your best-selling items or featured collections.",
    thumbnailUrl: productShowcaseImg,
    downloads: 1250,
    isPremium: true,
    images: [productShowcaseImg, heroBannerImg, testimonialsImg],
    requirements: "Shopify 2.0+, Dawn theme compatible",
    features: [
      "Fully responsive design",
      "Smooth hover animations",
      "Quick view modal",
      "Customizable grid layout",
      "Color scheme options",
    ],
    changelog: "v1.2.0 - Added quick view feature\nv1.1.0 - Improved mobile responsiveness\nv1.0.0 - Initial release",
  },
};

//todo: remove mock functionality - related sections data
const relatedSections = [
  {
    id: "2",
    title: "Hero Banner with CTA",
    category: "Hero Sections",
    description: "Eye-catching hero section with customizable call-to-action buttons.",
    thumbnailUrl: heroBannerImg,
    downloads: 2100,
    isPremium: false,
  },
  {
    id: "3",
    title: "Customer Testimonials",
    category: "Social Proof",
    description: "Display customer reviews in an elegant layout.",
    thumbnailUrl: testimonialsImg,
    downloads: 890,
    isPremium: true,
  },
  {
    id: "4",
    title: "Newsletter Signup",
    category: "Email Marketing",
    description: "Convert visitors into subscribers.",
    thumbnailUrl: newsletterImg,
    downloads: 1540,
    isPremium: false,
  },
];

export default function SectionDetail() {
  const [, params] = useRoute("/section/:id");
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sectionId = params?.id || "1";
  const section = sectionDetails[sectionId] || sectionDetails["1"];

  const handleDownload = async () => {
    setIsDownloading(true);
    //todo: remove mock functionality - download simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDownloading(false);
    
    toast({
      title: "Download Complete!",
      description: `${section.title} has been downloaded successfully.`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % section.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? section.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Browse", href: "/browse" },
            { label: section.category, href: "/browse" },
            { label: section.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden mb-4 group">
              <img
                src={section.images[currentImageIndex]}
                alt={`${section.title} preview ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                data-testid="img-preview-main"
              />
              
              {section.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover-elevate active-elevate-2"
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover-elevate active-elevate-2"
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {section.images.length > 1 && (
              <div className="flex gap-3 mb-8">
                {section.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-video w-24 rounded-lg overflow-hidden border-2 transition-all hover-elevate ${
                      currentImageIndex === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="description" className="border border-card-border rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-description">
                  <span className="font-semibold">Description</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-full-description">
                    {section.description}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="features" className="border border-card-border rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-features">
                  <span className="font-semibold">Features</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {section.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground" data-testid={`text-feature-${index}`}>
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="requirements" className="border border-card-border rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-requirements">
                  <span className="font-semibold">Requirements</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground" data-testid="text-requirements">{section.requirements}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="changelog" className="border border-card-border rounded-xl px-6">
                <AccordionTrigger className="hover:no-underline" data-testid="accordion-changelog">
                  <span className="font-semibold">Changelog</span>
                </AccordionTrigger>
                <AccordionContent>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans" data-testid="text-changelog">
                    {section.changelog}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-card-border rounded-xl p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-3" data-testid="text-section-title">
                  {section.title}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" data-testid="badge-category">
                    {section.category}
                  </Badge>
                  {section.isPremium && (
                    <Badge className="bg-accent text-accent-foreground" data-testid="badge-premium">
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm flex items-center gap-1.5" data-testid="text-download-count">
                  <Download className="w-4 h-4" />
                  {section.downloads.toLocaleString()} downloads
                </p>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleDownload}
                disabled={isDownloading}
                data-testid="button-download"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Section
                  </>
                )}
              </Button>

              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4" data-testid="text-related-title">
                  Related Sections
                </h3>
                <div className="space-y-4">
                  {relatedSections.map((related) => (
                    <SectionCard key={related.id} {...related} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
