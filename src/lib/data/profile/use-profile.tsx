"use client";

import { UpdateUserInput, User } from "@/types";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  isClient,
  onAuthChange,
  updateUser,
} from "@/lib/auth/localstorage-auth";

export function useProfile() {
  const [user, setUser] = useState<User | null>(() =>
    isClient() ? getCurrentUser() : null
  );
  useEffect(() => {
    const stop = onAuthChange(() => {
      setUser(getCurrentUser());
    });
    return stop;
  }, []);

  const doUpdateProfile = async (userId: string, userData: UpdateUserInput) => {
    const session = updateUser(userId, userData);
    setUser(session.user);
    return session;
  };

  return {
    updateProfile: doUpdateProfile,
  };
}
