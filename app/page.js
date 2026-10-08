import EditorialContent from "@/components/EditorialContent";
import ProductCard from "@/components/ProductCard";
import TeamCard from "@/components/TeamCard";
import { getContent, listContent } from "@/lib/content.mjs";

export default async function Home() {
  const [empresa, produtos, equipe] = await Promise.all([
    getContent("paginas", "empresa"),
    listContent("produtos"),
    listContent("equipe"),
  ]);

  return (
    <>
      <nav aria-label="Seções da página" className="section-nav">
        <a href="#empresa">Empresa</a>
        <a href="#produtos">Produtos</a>
        <a href="#equipe">Equipe</a>
      </nav>

      <section id="empresa" aria-labelledby="empresa-titulo">
        {empresa ? (
          <>
            <h1 id="empresa-titulo">{empresa.frontmatter.title}</h1>
            <p className="lead">{empresa.frontmatter.lead}</p>
            <EditorialContent source={empresa.content} />
          </>
        ) : (
          // Comportamento explícito: sem empresa.mdx, a home continua funcionando com um aviso.
          <>
            <h1 id="empresa-titulo">Apresentação indisponível</h1>
            <p>Crie o arquivo content/paginas/empresa.mdx para exibir a apresentação da empresa.</p>
          </>
        )}
      </section>

      <section id="produtos" aria-labelledby="produtos-titulo">
        <h2 id="produtos-titulo">Produtos</h2>
        {produtos.length ? (
          <ul className="grid">
            {produtos.map(({ slug, frontmatter }) => (
              <li key={slug}><ProductCard slug={slug} {...frontmatter} /></li>
            ))}
          </ul>
        ) : <p>Nenhum produto cadastrado.</p>}
      </section>

      <section id="equipe" aria-labelledby="equipe-titulo">
        <h2 id="equipe-titulo">Equipe</h2>
        {equipe.length ? (
          <ul className="grid">
            {equipe.map(({ slug, frontmatter, content }) => (
              <li key={slug}><TeamCard {...frontmatter} bio={content} /></li>
            ))}
          </ul>
        ) : <p>Nenhum integrante cadastrado.</p>}
      </section>
    </>
  );
}
