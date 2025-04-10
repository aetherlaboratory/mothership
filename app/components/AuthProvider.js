"use client";
import { SessionProvider } from "next-auth/react";

/**
 * Authentication Provider to wrap the Next.js app.
 * Ensures session management is globally accessible.
 */
const AuthProvider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
