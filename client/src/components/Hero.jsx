import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import heroBackgroundImg from "@assets/generated_images/Hero_background_mosaic_aadfb0f0.png";
export default function Hero() {
    return (<section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackgroundImg})` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"/>
        <div className="absolute inset-0 backdrop-blur-2xl opacity-40"/>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6" data-testid="badge-featured">
          <Sparkles className="w-4 h-4 text-primary"/>
          <span className="text-sm font-medium text-foreground">Premium Shopify Sections</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-hero-title">
          Build Beautiful Stores
          <br />
          <span className="text-primary">In Minutes</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
          Browse our curated collection of pre-built Shopify theme sections. Download, customize, and launch your store faster than ever.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/browse" data-testid="link-browse-sections">
            <Button size="lg" className="px-8 gap-2" data-testid="button-browse-sections">
              Browse Sections
              <ArrowRight className="w-4 h-4"/>
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 bg-background/80 backdrop-blur-sm border-2" data-testid="button-learn-more">
            Learn More
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2" data-testid="stat-sections">
            <span className="font-bold text-2xl text-foreground">120+</span>
            <span>Sections</span>
          </div>
          <div className="w-px h-8 bg-border"/>
          <div className="flex items-center gap-2" data-testid="stat-downloads">
            <span className="font-bold text-2xl text-foreground">1.2k</span>
            <span>Downloads</span>
          </div>
          <div className="w-px h-8 bg-border"/>
          <div className="flex items-center gap-2" data-testid="stat-rating">
            <span className="font-bold text-2xl text-foreground">4.9</span>
            <span>Rating</span>
          </div>
        </div>
      </div>
    </section>);
}
