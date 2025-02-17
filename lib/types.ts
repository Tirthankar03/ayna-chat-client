export interface User {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface Session {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    user: User;
  }
  
 export interface Message {
    id: number;
    documentId: string;
    content: string;
    role: "user" | "assistant"; // Assuming role can be either 'user' or 'assistant'
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    session: Session;
  }