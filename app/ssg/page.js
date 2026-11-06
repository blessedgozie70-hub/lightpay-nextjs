export const dynamic = "force-static";

async function getPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "force-cache",
  });

  if (!response.ok) throw new Error("Failed to fetch SSG data");
  return response.json();
}

export default async function SSGPage() {
  const post = await getPost();

  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "24px" }}>
      <h1>Static Site Generation (SSG)</h1>
      <p>This page fetches data during the production build.</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
}
