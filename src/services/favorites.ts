import { auth } from "../firebase";

// GraphQL endpoint of the portfolio backend. Override per-environment with
// VITE_API_URL (e.g. the deployed Vercel URL in production).
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/graphql";

export type Favorite = {
  id: string;
  videoId: string;
  videoUrl: string;
  addedAt?: string;
};

// Identity is the signed-in user's email, sent in the x-user-email header the
// backend already reads to build its GraphQL context.
async function gqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const email = auth.currentUser?.email;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(email ? { "x-user-email": email } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  return json.data as T;
}

export async function getFavorites(): Promise<Favorite[]> {
  try {
    const data = await gqlRequest<{
      myFavorites: { id: string; videoId: string; videoUrl: string; createdAt: string }[];
    }>(`query { myFavorites { id videoId videoUrl createdAt } }`);

    return data.myFavorites.map((f) => ({
      id: f.videoId,
      videoId: f.videoId,
      videoUrl: f.videoUrl,
      addedAt: f.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}

export async function saveFavorite(
  videoId: string,
  videoUrl: string
): Promise<void> {
  await gqlRequest(
    `mutation ($videoId: String!, $videoUrl: String!) {
      addFavorite(videoId: $videoId, videoUrl: $videoUrl) { id }
    }`,
    { videoId, videoUrl }
  );
}

export async function removeFavorite(videoId: string): Promise<void> {
  await gqlRequest(
    `mutation ($videoId: String!) { removeFavorite(videoId: $videoId) }`,
    { videoId }
  );
}

export async function isFavorite(videoId: string): Promise<boolean> {
  const data = await gqlRequest<{ isFavorite: boolean }>(
    `query ($videoId: String!) { isFavorite(videoId: $videoId) }`,
    { videoId }
  );
  return data.isFavorite;
}
