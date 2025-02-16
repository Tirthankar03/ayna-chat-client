"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

export default function ReduxProviderWithUser({
  initialUser,
  children,
}: {
  initialUser: any;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialUser) {
      dispatch(setUser(initialUser));
    }
  }, [initialUser, dispatch]);

  return <>{children}</>;
}
