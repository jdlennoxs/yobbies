import fs from "fs";
import path from "path";

const POSTS_PATH = path.join(process.cwd(), "data/awards");

export default function AwardsPage({ award }) {
  return <>{JSON.stringify(award)}</>;
}

export async function getStaticPaths() {
  const fullPaths = fs.readdirSync(POSTS_PATH);
  const paths = fullPaths // Remove file extensions for page paths
    .map((path) => path.replace(/\.json?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { id: slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const fullPath = path.join(POSTS_PATH, `${context.params.id}.json`);
  const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  return {
    props: {
      award: fileContents,
    },
  };
}
