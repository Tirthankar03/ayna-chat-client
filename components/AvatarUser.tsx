'use client';
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSelector } from "react-redux";
import { User } from "@/lib/types";
import clsx from "clsx";
import { LoadingSpinner } from "./spinner";

const AvatarUser = () => {
  const user: User = useSelector((state: any) => state.user.user);
  
  // const firstLetter = user.username?.charAt(0).toUpperCase();

  return (
    <Avatar>
      <AvatarFallback className={clsx("bg-primary/30 cursor-pointer")}>
        {user ? `${user.username?.charAt(0).toUpperCase()}`: <LoadingSpinner className=""/>}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;