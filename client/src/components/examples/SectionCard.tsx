import SectionCard from '../SectionCard';
import productShowcaseImg from '@assets/generated_images/Product_showcase_section_8816f20f.png';

export default function SectionCardExample() {
  return (
    <div className="max-w-sm">
      <SectionCard
        id="1"
        title="Product Showcase Grid"
        category="Product Display"
        description="Beautiful grid layout for showcasing your products with hover effects and quick view functionality."
        thumbnailUrl={productShowcaseImg}
        downloads={1250}
        isPremium={true}
      />
    </div>
  );
}
