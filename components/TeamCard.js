import Image from "next/image";
import EditorialContent from "./EditorialContent";

export default function TeamCard({ name, position, image, alt, bio }) {
  return (
    <article className="card team-card">
      {image && <Image src={image} alt={alt || ""} width={400} height={400} />}
      <h3>{name}</h3>
      <p className="eyebrow">{position}</p>
      <EditorialContent source={bio} />
    </article>
  );
}
