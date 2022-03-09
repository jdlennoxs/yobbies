import AddAward from "./add";
import Link from "next/link";

export default function AwardAdmin({ awards }) {
  return (
    <>
      <AddAward />
      <div className="content">
        <h1 className="has-text-white">Awards</h1>
        <ul>
          {awards.map((award) => (
            <li className="has-text-white">
              <Link href={`admin/awards/${award.id}`}>{award.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
