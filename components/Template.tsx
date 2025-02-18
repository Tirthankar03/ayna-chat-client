"use client";
import { User } from "@/lib/types";
import React, { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./spinner";
import { createChatSession } from "@/actions/session.actions";

const Template = () => {
  const user: User = useSelector((state: any) => state.user.user);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateSession = async () => {
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
    <div className="flex flex-col items-center justify-center h-full px-4 py-6">
      <div className="max-w-3xl w-full rounded-lg p-6 ">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-semibold text-gray-800">
            
            {user ? `Welcome ${user.username}!`: <LoadingSpinner className=""/>}
          </h2>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-500">
            To proceed, click on the "+" button below to start a new
            conversation.
          </p>
          <Button
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition duration-300"
            onClick={handleCreateSession}
            disabled={isPending}
          >
            {isPending ? (
              <LoadingSpinner className="h-4 w-4 text-white" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span className="ml-2">Start New Session</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Template;
