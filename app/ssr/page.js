export const dynamic = "force-dynamic";

async function getPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/2", {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch SSR data");
  return response.json();
}

export default async function SSRPage() {
  const post = await getPost();

  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "24px" }}>
      <h1>Server-Side Rendering (SSR)</h1>
      <p>This page fetches fresh data on every request.</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </main>
  );
}
