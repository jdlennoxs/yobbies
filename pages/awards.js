import Link from "next/link";
import fs from "fs";
import path from "path";

const POSTS_PATH = path.join(process.cwd(), "data/awards");

export default function Awards({ awards }) {
  return (
    <div className="narrow-container p-6 my-6 ">
      <div className="content">
        <h1 className="has-text-white">The Awards</h1>
      </div>
      <ul>
        <div className="columns is-multiline">
          {awards.map((award) => (
            <li>
              <Link href={`/awards/${award.slug}`}>
                <a className="poster-link">
                  <h2>{award.name}</h2>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const fullPaths = fs.readdirSync(POSTS_PATH);
  const paths = fullPaths // Remove file extensions for page paths
    .map((path) => path.replace(/\.json?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ id: slug }));

  const awards = paths.map((p) => {
    const fullPath = path.join(POSTS_PATH, `${p.id}.json`);
    const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    return { name: fileContents.name, slug: p.id };
  });
  return {
    props: {
      awards,
    },
  };
  // will be passed to the page component as props
}
