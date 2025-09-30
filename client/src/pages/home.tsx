import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Section } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: sections, isLoading } = useQuery<Section[]>({
    queryKey: ["/api/sections"],
  });

  const featuredSections = sections?.slice(0, 6) || [];

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" data-testid={`skeleton-card-${i}`} />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredSections.map((section) => (
              <SectionCard key={section.id} {...section} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
