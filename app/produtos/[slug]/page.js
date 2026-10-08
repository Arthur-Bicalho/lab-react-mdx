import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialContent from "@/components/EditorialContent";
import { getContent, listContent } from "@/lib/content.mjs";

export async function generateStaticParams() {
  return (await listContent("produtos")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getContent("produtos", slug);
  return doc ? { title: doc.frontmatter.name, description: doc.frontmatter.description } : { title: "Produto não encontrado" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const doc = await getContent("produtos", slug);
  if (!doc) notFound();
  const { name, category, description, image, alt } = doc.frontmatter;
  return (
    <article>
      <Link href="/#produtos">← Voltar aos produtos</Link>
      <p className="eyebrow">{category}</p>
      <h1>{name}</h1>
      <p className="lead">{description}</p>
      {image && <Image className="product-cover" src={image} alt={alt || ""} width={800} height={600} priority />}
      <EditorialContent source={doc.content} />
    </article>
  );
}
