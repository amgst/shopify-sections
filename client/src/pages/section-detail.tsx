import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Section } from "@shared/schema";

export default function SectionDetail() {
  const [, params] = useRoute("/section/:id");
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const sectionId = params?.id || "";

  const { data: section, isLoading } = useQuery<Section>({
    queryKey: ["/api/sections", sectionId],
    enabled: !!sectionId,
  });

  const { data: allSections } = useQuery<Section[]>({
    queryKey: ["/api/sections"],
  });

  const relatedSections = (allSections || [])
    .filter(s => s.id !== sectionId && s.category === section?.category)
    .slice(0, 3);

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDownloading(false);
    
    toast({
      title: "Download Complete!",
      description: `${section?.title} has been downloaded successfully.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Skeleton className="aspect-video w-full mb-8" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-not-found">
              Section Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The section you're looking for doesn't exist.
            </p>
            <Link href="/browse">
              <Button variant="outline" className="gap-2" data-testid="button-back-browse">
                <ArrowLeft className="w-4 h-4" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden mb-8">
              <img
                src={section.thumbnailUrl}
                alt={section.title}
                className="w-full h-full object-cover"
                data-testid="img-preview-main"
              />
            </div>

            <div className="bg-card border border-card-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4" data-testid="text-description-title">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-full-description">
                {section.description}
              </p>
            </div>
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

              {relatedSections.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
