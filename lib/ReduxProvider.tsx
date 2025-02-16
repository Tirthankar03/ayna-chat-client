// lib/ReduxProvider.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import ReduxProviderWithUser from "./ReduxProviderWithUser";

export default function ReduxProvider({
  initialUser,
  children,
}: {
  initialUser: any;
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxProviderWithUser initialUser={initialUser}>
          {children}
        </ReduxProviderWithUser>
      </PersistGate>
    </Provider>
  );
}
