import { useState } from 'react';
import FilterSidebar from '../FilterSidebar';

export default function FilterSidebarExample() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filterGroups = [
    {
      id: 'category',
      label: 'Category',
      filters: [
        { id: 'hero', label: 'Hero Sections', count: 24 },
        { id: 'product', label: 'Product Display', count: 18 },
        { id: 'testimonial', label: 'Testimonials', count: 12 },
        { id: 'newsletter', label: 'Newsletter', count: 8 },
      ],
    },
    {
      id: 'type',
      label: 'Type',
      filters: [
        { id: 'free', label: 'Free', count: 45 },
        { id: 'premium', label: 'Premium', count: 32 },
      ],
    },
  ];

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <FilterSidebar
      filterGroups={filterGroups}
      selectedFilters={selectedFilters}
      onFilterChange={handleFilterChange}
      onClearAll={() => setSelectedFilters([])}
    />
  );
}
