import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
export default function Breadcrumbs({ items }) {
    return (<nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" data-testid="nav-breadcrumbs">
      <Link href="/" data-testid="link-breadcrumb-home">
        <div className="flex items-center gap-2 hover:text-foreground transition-colors hover-elevate active-elevate-2 px-2 py-1 rounded-md">
          <Home className="w-4 h-4"/>
          <span>Home</span>
        </div>
      </Link>

      {items.map((item, index) => (<div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4"/>
          {item.href ? (<Link href={item.href} data-testid={`link-breadcrumb-${index}`}>
              <span className="hover:text-foreground transition-colors hover-elevate active-elevate-2 px-2 py-1 rounded-md">
                {item.label}
              </span>
            </Link>) : (<span className="text-foreground font-medium" data-testid={`text-breadcrumb-${index}`}>
              {item.label}
            </span>)}
        </div>))}
    </nav>);
}
