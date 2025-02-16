import { getAuthToken } from "@/services/get-auth-token";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";


// Helper to fetch user's chat sessions
export async function fetchUserSessions() {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${API_URL}/api/sessions?populate=user&sort=updatedAt:desc`, {
      next: {
        revalidate: 1,
        tags: ['session'],
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sessions");
    }

    const { data } = await response.json();

    // console.log("data in fetchUserSessions>>>>>>>", data)

    return data.map((session: any) => ({
      id: session.id,
      title: session.title,
      updated_at: session.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
}


