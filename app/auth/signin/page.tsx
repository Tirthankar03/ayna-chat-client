
import { Button } from '@/components/ui/button';
import { Github, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
  const githubPath = "/api/connect/github";
  const googlePath = "/api/connect/google";
  const githubUrl = new URL(backendUrl + githubPath);
  const googleUrl = new URL(backendUrl + googlePath);



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <MessageCircle className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold ml-2">Chat App</h1>
        </div>
        <div className="flex-col  gap-4">
        <Link href={googleUrl.href}  
          className="text-white mb-2 h-9 bg-primary hover:bg-primary/90 px-4 py-2 w-full max-w-xs inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
              />
            </svg>
          Continue with Google
        </Link>


        <Link href={githubUrl.href}  
          className="text-white h-9 px-4 py-2 w-full max-w-xs bg-black hover:bg-black/80 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
            <Github/>
          Continue with Github
        </Link>
        </div>
     

        
       
      </div>
    </div>
  );
}