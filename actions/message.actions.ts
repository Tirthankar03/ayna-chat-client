"use server"
import { getAuthToken } from "@/services/get-auth-token";
import { extractUserDataFromToken } from "@/services/token-data";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";

export async function createMessage({sessionDoc, content, role}:{sessionDoc: string, content: string, role: string} ) {
    try {
      const authToken = await getAuthToken();
  
  
      const response = await fetch(`${API_URL}/api/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: {
            content,
            role,
            session: sessionDoc
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