"use client";

import { MessageCircle, Plus } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { LoadingSpinner } from "./spinner";
import { createChatSession } from "@/actions/session.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PlusButton = () => {
  const { state } = useSidebar();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleClick = async () => {
    startTransition(async () => {
      try {
        const newSession = await createChatSession();
        router.push(`/chat?id=${newSession}`);
      } catch (err) {
        console.log("Error creating session>>>>", err);
      }
    });
  };

  return (
    <>
      {state === "collapsed" ? (
        <div className="flex">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <Link href={`/chat`} className="font-semibold">Ayna Chat</Link>

          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            disabled={isPending}
          >
            {isPending ? (
              <LoadingSpinner className="h-4 w-4 text-primary" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default PlusButton;
