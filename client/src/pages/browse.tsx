import { useState } from "react";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import SectionCard from "@/components/SectionCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import productShowcaseImg from "@assets/generated_images/Product_showcase_section_8816f20f.png";
import heroBannerImg from "@assets/generated_images/Hero_banner_section_25f20588.png";
import testimonialsImg from "@assets/generated_images/Testimonials_section_8a78ef44.png";
import newsletterImg from "@assets/generated_images/Newsletter_section_b8bc082f.png";
import collectionGridImg from "@assets/generated_images/Collection_grid_section_e9154ec7.png";

//todo: remove mock functionality - filter groups data
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

//todo: remove mock functionality - sections data
const allSections = [
  {
    id: "1",
    title: "Product Showcase Grid",
    category: "Product Display",
    description: "Beautiful grid layout for showcasing your products with hover effects and quick view functionality.",
    thumbnailUrl: productShowcaseImg,
    downloads: 1250,
    isPremium: true,
    filters: ["product", "premium", "responsive"],
  },
  {
    id: "2",
    title: "Hero Banner with CTA",
    category: "Hero Sections",
    description: "Eye-catching hero section with customizable call-to-action buttons and overlay effects.",
    thumbnailUrl: heroBannerImg,
    downloads: 2100,
    isPremium: false,
    filters: ["hero", "free", "responsive", "animations"],
  },
  {
    id: "3",
    title: "Customer Testimonials",
    category: "Social Proof",
    description: "Display customer reviews and testimonials in an elegant, trust-building layout.",
    thumbnailUrl: testimonialsImg,
    downloads: 890,
    isPremium: true,
    filters: ["testimonial", "premium", "responsive"],
  },
  {
    id: "4",
    title: "Newsletter Signup",
    category: "Email Marketing",
    description: "Convert visitors into subscribers with this beautifully designed newsletter section.",
    thumbnailUrl: newsletterImg,
    downloads: 1540,
    isPremium: false,
    filters: ["newsletter", "free", "responsive"],
  },
  {
    id: "5",
    title: "Featured Collection",
    category: "Product Display",
    description: "Highlight your best-selling products with this featured collection showcase.",
    thumbnailUrl: collectionGridImg,
    downloads: 1780,
    isPremium: true,
    filters: ["collection", "premium", "responsive", "dark-mode"],
  },
  {
    id: "6",
    title: "Product Grid Advanced",
    category: "Product Display",
    description: "Advanced product grid with filtering, sorting, and quick add-to-cart functionality.",
    thumbnailUrl: productShowcaseImg,
    downloads: 945,
    isPremium: true,
    filters: ["product", "premium", "responsive", "animations"],
  },
  {
    id: "7",
    title: "Minimal Hero Section",
    category: "Hero Sections",
    description: "Clean and minimal hero section perfect for modern, sophisticated stores.",
    thumbnailUrl: heroBannerImg,
    downloads: 1620,
    isPremium: false,
    filters: ["hero", "free", "responsive"],
  },
  {
    id: "8",
    title: "Newsletter with Discount",
    category: "Email Marketing",
    description: "Newsletter signup with special discount offer to boost conversion rates.",
    thumbnailUrl: newsletterImg,
    downloads: 1230,
    isPremium: true,
    filters: ["newsletter", "premium", "responsive"],
  },
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredSections = allSections.filter((section) => {
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
            {filteredSections.length} sections available
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

            {filteredSections.length > 0 ? (
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
