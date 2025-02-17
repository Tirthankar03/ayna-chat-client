import { Suspense } from "react"

function ChatInterface({ params, searchParams: {id} }) {


  return (
    <div>
      <Suspense key={params.sessionId} fallback={<div>Loading.....</div>}>
        <div>Hello {params.sessionId}</div>
        <div>{id}</div>
        {/* ChatArea */}
        {/* chatArea will fetch the data for the corresponding sessionId and fallback will appear */}
      </Suspense>
      
    </div>
  )
}

export default ChatInterface