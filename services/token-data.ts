import jwt, { JwtPayload } from "jsonwebtoken";
import { getAuthToken } from "./get-auth-token";

interface CustomJwtPayload extends JwtPayload {
  id: number;
}



export async function extractUserDataFromToken(): Promise<number | null> {
  const authToken = await getAuthToken();
  if (!authToken) return null;

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as CustomJwtPayload;
    return decoded.id ? decoded.id : null;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
}
