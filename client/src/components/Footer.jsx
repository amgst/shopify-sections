import { Link } from "wouter";
export default function Footer() {
    return (<footer className="bg-card border-t border-card-border mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg text-foreground">Shopify Sections</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium pre-built Shopify theme sections for modern e-commerce stores.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/browse" data-testid="link-footer-browse"><span className="hover:text-foreground transition-colors">Browse Sections</span></Link></li>
              <li><Link href="/categories" data-testid="link-footer-categories"><span className="hover:text-foreground transition-colors">Categories</span></Link></li>
              <li><Link href="/pricing" data-testid="link-footer-pricing"><span className="hover:text-foreground transition-colors">Pricing</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs" data-testid="link-footer-docs"><span className="hover:text-foreground transition-colors">Documentation</span></Link></li>
              <li><Link href="/support" data-testid="link-footer-support"><span className="hover:text-foreground transition-colors">Support</span></Link></li>
              <li><Link href="/blog" data-testid="link-footer-blog"><span className="hover:text-foreground transition-colors">Blog</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" data-testid="link-footer-about"><span className="hover:text-foreground transition-colors">About</span></Link></li>
              <li><Link href="/contact" data-testid="link-footer-contact"><span className="hover:text-foreground transition-colors">Contact</span></Link></li>
              <li><Link href="/privacy" data-testid="link-footer-privacy"><span className="hover:text-foreground transition-colors">Privacy</span></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Shopify Sections. All rights reserved.</p>
        </div>
      </div>
    </footer>);
}
