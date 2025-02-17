"use server"

import { getAuthToken } from "@/services/get-auth-token";
import { extractUserDataFromToken } from "@/services/token-data";
import { getUserMeLoader } from "@/services/user-me-loader";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";

export async function createChatSession() {
  try {
    const authToken = await getAuthToken();

    const userId = await extractUserDataFromToken();

    if (!userId) {
      throw new Error("User data not found in token");
    }


    const response = await fetch(`${API_URL}/api/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          user: userId
        }
      }),
    });
    
    console.log("response>>>>>>>>>>", response)
    
    
    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    revalidateTag('session');
    
    return await response.json();
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

export async function deleteChatSession(sessionId: string) {
  try {
    const authToken = await getAuthToken();

    const response = await fetch(`${API_URL}/api/sessions/${sessionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("delete chat session>>>>>", response);

    if (!response.ok) {
      throw new Error("Failed to delete session");
    }

    revalidateTag("session");

    console.log("Deleted successfully!");

    // Handle 204 No Content
    if (response.status === 204) {
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
}





export async function renameChatSession(sessionId: string, title: string) {
  try {
    const authToken = await getAuthToken();

    console.log("sessionId>>>>>>", sessionId);
    console.log("title>>>>>>", title);

    revalidateTag("session");

    

    const response = await fetch(`${API_URL}/api/sessions/${sessionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          title
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to rename session: ${response.statusText}`);
    }

    return await response.json();

    return;
  } catch (error) {
    console.error("Error renaming client session:", error);
    throw error;
  }
}

