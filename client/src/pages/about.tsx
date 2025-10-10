import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Sparkles, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">
              About Shopify Sections
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-description">
              Your premier destination for high-quality, ready-to-use Shopify section templates. 
              We help developers and merchants build beautiful online stores faster.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <Card data-testid="card-mission">
              <CardHeader>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that creating exceptional e-commerce experiences shouldn't require 
                  starting from scratch. Our mission is to provide developers and merchants with 
                  a curated collection of professional Shopify section templates that are both 
                  beautiful and functional, saving countless hours of development time.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10" data-testid="text-features-title">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card data-testid="card-feature-quality">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Premium Quality</CardTitle>
                  <CardDescription>
                    Each section is carefully crafted with attention to detail, following 
                    Shopify's best practices and modern design principles.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card data-testid="card-feature-ready">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Ready to Use</CardTitle>
                  <CardDescription>
                    Download and implement sections instantly. No complex setup required - 
                    just copy, paste, and customize to match your brand.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card data-testid="card-feature-diverse">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Diverse Categories</CardTitle>
                  <CardDescription>
                    From hero sections to product showcases, testimonials to FAQs - 
                    we cover all the essential components for your Shopify store.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card data-testid="card-feature-community">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Community Driven</CardTitle>
                  <CardDescription>
                    Built by developers, for developers. We're constantly adding new sections 
                    based on community feedback and emerging design trends.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-muted/50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our collection of Shopify sections and start building your dream store today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/browse" data-testid="link-browse-sections">
                <Button size="lg" data-testid="button-browse-sections">
                  Browse Sections
                </Button>
              </Link>
              <Link href="/contact" data-testid="link-contact">
                <Button size="lg" variant="outline" data-testid="button-contact">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
