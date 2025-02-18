"use server";

import { getAuthToken } from "@/services/get-auth-token";
import { extractUserDataFromToken } from "@/services/token-data";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";

// export async function updateUserProfile(username: string) {
//   try {
//     const authToken = await getAuthToken();

//     const response = await fetch(`${API_URL}/api/users/me`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//       body: JSON.stringify({ username }),
//     });

//     if (!response.ok) throw new Error("Failed to update profile");

//     const updatedUser = await response.json();
    
//     revalidateTag("user");

//     return updatedUser;
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     throw error;
//   }
// }


  

//   export async function updateUserProfile(username: string) {
//   try {
//     const authToken = await getAuthToken();

//     console.log('username before going into the api call>>>>', username)

//     const response = await fetch(`${API_URL}/api/users/update-username`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({ username }),
//       });

//     console.log("response>>>>", response)

//     if (!response.ok) throw new Error("Failed to update profile");

//     const updatedUser = await response.json();
    
//     revalidateTag("user");

//     return updatedUser;
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     throw error;
//   }
// }


export async function updateUserProfile(username: string) {
    try {
      const authToken = await getAuthToken(); 

      const userId = await extractUserDataFromToken()
  
      console.log("Updating username:", username);
  
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username }),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        throw new Error(`Failed to update profile: ${await response.text()}`);
      }
  
      const updatedUser = await response.json();

      console.log("updatedUser>>>", updatedUser.data)
  
      revalidateTag("user"); // Ensure UI updates
  
      return updatedUser.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }
  
