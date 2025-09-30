import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Section } from "@shared/schema";

const filterGroups = [
  {
    id: "category",
    label: "Category",
    filters: [
      { id: "hero", label: "Hero Sections", count: 24 },
      { id: "product", label: "Product Display", count: 32 },
      { id: "testimonial", label: "Testimonials", count: 12 },
      { id: "newsletter", label: "Newsletter", count: 15 },
      { id: "collection", label: "Collections", count: 18 },
    ],
  },
  {
    id: "type",
    label: "Type",
    filters: [
      { id: "free", label: "Free", count: 65 },
      { id: "premium", label: "Premium", count: 55 },
    ],
  },
  {
    id: "features",
    label: "Features",
    filters: [
      { id: "responsive", label: "Responsive", count: 120 },
      { id: "animations", label: "Animations", count: 45 },
      { id: "dark-mode", label: "Dark Mode", count: 38 },
    ],
  },
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { data: sections, isLoading } = useQuery<Section[]>({
    queryKey: ["/api/sections"],
  });

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredSections = (sections || []).filter((section) => {
    const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 ||
      selectedFilters.some((filter) => section.filters.includes(filter));

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="text-page-title">
            Browse Sections
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">
            {isLoading ? "Loading..." : `${filteredSections.length} sections available`}
          </p>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block">
            <FilterSidebar
              filterGroups={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearAll={() => setSelectedFilters([])}
            />
          </div>

          <div className="flex-1">
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2" data-testid="button-mobile-filters">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {selectedFilters.length > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                        {selectedFilters.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar
                      filterGroups={filterGroups}
                      selectedFilters={selectedFilters}
                      onFilterChange={handleFilterChange}
                      onClearAll={() => setSelectedFilters([])}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full" data-testid={`skeleton-card-${i}`} />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : filteredSections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSections.map((section) => (
                  <SectionCard key={section.id} {...section} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg" data-testid="text-no-results">
                  No sections found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
