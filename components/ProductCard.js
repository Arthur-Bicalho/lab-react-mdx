import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ slug, name, category, description, image, alt }) {
  return (
    <article className="card product-card">
      {image && <Image src={image} alt={alt || ""} width={800} height={600} />}
      <p className="eyebrow">{category}</p>
      <h3><Link href={`/produtos/${slug}`}>{name || slug}</Link></h3>
      <p>{description}</p>
    </article>
  );
}
