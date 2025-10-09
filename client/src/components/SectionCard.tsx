import { Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "wouter";
import { createSectionUrl } from "@/lib/slugify";

interface SectionCardProps {
  id: string;
  title: string;
  slug?: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  downloads: number;
  isPremium?: boolean;
}

export default function SectionCard({
  id,
  title,
  slug,
  category,
  description,
  thumbnailUrl,
  downloads,
  isPremium = false,
}: SectionCardProps) {
  const sectionUrl = createSectionUrl(id, title);
  
  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 hover:shadow-lg" data-testid={`card-section-${id}`}>
      <Link href={`/section/${sectionUrl}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            data-testid={`img-thumbnail-${id}`}
          />
          {isPremium && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground" data-testid={`badge-premium-${id}`}>
              Premium
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-6">
        <Badge variant="secondary" className="mb-3" data-testid={`badge-category-${id}`}>
          {category}
        </Badge>
        
        <Link href={`/section/${sectionUrl}`}>
          <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1" data-testid={`text-title-${id}`}>
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`text-description-${id}`}>
          {description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-border mt-auto">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm" data-testid={`text-downloads-${id}`}>
          <Download className="w-4 h-4" />
          <span>{downloads ? downloads.toLocaleString() : '0'} downloads</span>
        </div>
        
        <Link href={`/section/${sectionUrl}`}>
          <Button variant="ghost" size="sm" className="gap-1.5" data-testid={`button-preview-${id}`}>
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
