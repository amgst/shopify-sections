import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, X } from "lucide-react";

interface Filter {
  id: string;
  label: string;
  count: number;
}

interface FilterGroup {
  id: string;
  label: string;
  filters: Filter[];
}

interface FilterSidebarProps {
  filterGroups: FilterGroup[];
  selectedFilters: string[];
  onFilterChange: (filterId: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({ 
  filterGroups, 
  selectedFilters, 
  onFilterChange, 
  onClearAll 
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(filterGroups.map(g => g.id))
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <aside className="w-64 bg-card border border-card-border rounded-xl p-6 sticky top-24 h-fit" data-testid="sidebar-filters">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-foreground">Filters</h3>
        {selectedFilters.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="text-accent hover:text-accent-foreground h-auto p-1"
            data-testid="button-clear-filters"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <div key={group.id} className="space-y-3">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-all"
              data-testid={`button-toggle-${group.id}`}
            >
              <span className="font-medium text-sm text-foreground">{group.label}</span>
              {expandedGroups.has(group.id) ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {expandedGroups.has(group.id) && (
              <div className="space-y-2 pl-2">
                {group.filters.map((filter) => (
                  <div key={filter.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <Checkbox
                        id={filter.id}
                        checked={selectedFilters.includes(filter.id)}
                        onCheckedChange={() => onFilterChange(filter.id)}
                        data-testid={`checkbox-${filter.id}`}
                      />
                      <label
                        htmlFor={filter.id}
                        className="text-sm text-muted-foreground cursor-pointer flex-1"
                      >
                        {filter.label}
                      </label>
                    </div>
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-count-${filter.id}`}>
                      {filter.count}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedFilters.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filterId) => {
              const filter = filterGroups
                .flatMap(g => g.filters)
                .find(f => f.id === filterId);
              
              if (!filter) return null;
              
              return (
                <Badge
                  key={filterId}
                  variant="secondary"
                  className="gap-1.5"
                  data-testid={`badge-selected-${filterId}`}
                >
                  {filter.label}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => onFilterChange(filterId)}
                  />
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
