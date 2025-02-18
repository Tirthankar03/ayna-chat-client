'use client'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Loader, LoaderCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MaxWidthWrapper from './MaxWidthWrapper';
import { addMessage, setMessages } from '@/store/chatSlice';
import { LoadingSpinner } from './spinner';
import { Message, User } from '@/lib/types';
import { RootState } from '@/store';

const URL = process.env.NEXT_PUBLIC_BACKEND_URL  ? process.env.NEXT_PUBLIC_BACKEND_URL : "http://localhost:1337"
const socket = io(URL);

type ChatAreaProps = {
  sessionId: string;
  messages: Message[]
}

export function ChatArea({ sessionId, messages }: ChatAreaProps) {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state: RootState) => state.chat[sessionId] || []);
  const user: User = useSelector((state: any) => state.user.user);
  const firstLetter = user.username?.charAt(0).toUpperCase();

  console.log('chatMessages>>>>>', chatMessages);
  
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!sessionId) return;

    // Load initial messages into Redux store
    if (chatMessages.length == 0 && messages && messages.length > 0) {
      dispatch(setMessages({ sessionId, messages }));
    }

    socket.emit('joinSession', { sessionId });

    const handleMessage = (newMessage: Message) => {
      dispatch(addMessage({ sessionId, message: newMessage }));
      if (newMessage.role === 'assistant') {
        setIsTyping(false);
      }
    };

    socket.on('receiveMessage', handleMessage);

    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [sessionId, messages, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { session: sessionId, content: message, role: 'user' };
    dispatch(addMessage({ sessionId, message: newMessage }));
    setMessage('');
    setIsTyping(true);
    socket.emit('sendMessage', newMessage);
  };

  return (
    <MaxWidthWrapper>
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((m: Message, index: number) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="mt-1">
                <AvatarImage src={m.role === 'user' ? '/placeholder.svg?height=40&width=40' : '/placeholder.svg?height=40&width=40'} alt={m.role} />
                <AvatarFallback>{m.role === 'user' ? `${firstLetter}` : 'AI'}</AvatarFallback>
              </Avatar>
              <div className={`rounded-lg px-4 py-2 mt-1 max-w-[80%] ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
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
        <div className="p-4">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isTyping}>
              {isTyping ? <LoadingSpinner className=""/> : <Send className="h-4 w-4" /> }
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
