"use client";
import { createChatSession } from "@/actions/session.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {


    try {
        const newSession = await createChatSession(input);

        console.log("newSession>>>>>>", newSession)

      } catch (err) {
        console.log('err in create session>>>>', err)
      }

  };
  return (
    <div className="m-auto text-base px-3 md:px-4 w-full lg:px-4 xl:px-5 h-full">
      <div className="mx-auto flex h-full w-full flex-col text-base lg:justify-center md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] relative">
        <div className="mb-7 hidden text-center lg:block">
            <div className="relative inline-flex justify-center text-center text-2xl font-semibold leading-9">
                <p className="text-3xl">Welcome USER!</p>
            </div>
        </div>
        <div className=" p-4">
          <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
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
    </div>
  );
};

export default page;
