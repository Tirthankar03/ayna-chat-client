"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MaxWidthWrapper from "./MaxWidthWrapper"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

type ChatProps = {
  sessionId: string
}

export function ChatArea({sessionId}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "user",
      content: `${sessionId}`,

    },
    {
      id: "2",
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
    {
      id: "3",
      role: "user",
      content:
        "This is a longer message to demonstrate how the chat bubbles handle multiple lines of text. It should wrap nicely within the container.",
    },
    {
      id: "4",
      role: "assistant",
      content:
        "This is a longer message to demonstrate how the chat bubbles handle multiple lines of text. It should wrap nicely within the container.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "This is a simulated response from the AI assistant.",
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <MaxWidthWrapper>

    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-3  ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar className="mt-1">
              <AvatarImage
                src={m.role === "user" ? "/placeholder.svg?height=40&width=40" : "/placeholder.svg?height=40&width=40"}
                alt={m.role}
              />
              <AvatarFallback>{m.role === "user" ? "U" : "AI"}</AvatarFallback>
            </Avatar>
            <div></div>
            <div
              className={`rounded-lg px-4 py-2 mt-1 max-w-[80%] ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-3">
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type a message..." 
            className="flex-1" 
          />
          <Button type="submit" size="icon" disabled={isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
    </MaxWidthWrapper>

  )
} 