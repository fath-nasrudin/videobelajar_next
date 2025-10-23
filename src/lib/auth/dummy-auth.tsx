"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthWrapper(props: P) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const { isAuthenticated } = useAuth();
    // Client-only: show nothing (or a spinner) until we know auth status
    if (!isClient) return <p>Loading...</p>;
    if (!isAuthenticated && isClient)
      return <div>Access denied. Please login.</div>;
    return <Component {...props} />;
  };
}
