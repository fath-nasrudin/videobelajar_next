import { Session, User } from "@/types";

const USERS_KEY = "__dummy_auth_users";
const SESSION_KEY = "__dummy_auth_session";

// ---- helpers for localStorage (safe-guarded) ----
export function isClient() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function readStorage<T>(key: string): T | null {
  if (!isClient()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.error("dummy-auth: failed to read storage", e);
    return null;
  }
}

function writeStorage(key: string, value: any) {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // notify other listeners in same tab
    window.dispatchEvent(new CustomEvent("dummy-auth:changed"));
  } catch (e) {
    console.error("dummy-auth: failed to write storage", e);
  }
}

function removeStorage(key: string) {
  if (!isClient()) return;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent("dummy-auth:changed"));
  } catch (e) {
    console.error("dummy-auth: failed to remove storage", e);
  }
}

// ---- user / session utilities ----
function getUsers(): User[] {
  return readStorage<User[]>(USERS_KEY) ?? [];
}

function saveUsers(users: User[]) {
  writeStorage(USERS_KEY, users);
}

function getSession(): Session | null {
  return readStorage<Session>(SESSION_KEY);
}

function saveSession(session: Session) {
  writeStorage(SESSION_KEY, session);
}

function clearSession() {
  removeStorage(SESSION_KEY);
}

// generate a very simple id/token (not secure)
function randId(prefix = "u_") {
  return prefix + Math.random().toString(36).slice(2, 10);
}

function fakeTokenFor(user: User) {
  // tiny fake token — DO NOT use in prod
  return btoa(`${user.id}:${user.email}:${Date.now()}`);
}

// ---- core API ----
export async function register(email: string, password: string) {
  // no password/email checks by design
  const users = getUsers();
  const exists = users.find((u) => u.email === email);
  if (exists) {
    throw new Error("Email already taken");
  }

  const user: User = { id: randId(), email, password };
  users.push(user);
  saveUsers(users);

  const session: Session = { user, token: fakeTokenFor(user) };
  saveSession(session);
  return session;
}

export async function login(email: string, password: string) {
  const users = getUsers();
  const user = users.find((u) => u.email === email) ?? null;
  if (!user) throw new Error("User not found");

  if (user.password !== password) throw new Error("Wrong password");
  1;
  const session: Session = { user, token: fakeTokenFor(user) };
  saveSession(session);
  return session;
}

export async function logout() {
  clearSession();
}

export function getCurrentUser(): User | null {
  return getSession()?.user ?? null;
}

export function getToken(): string | null {
  return getSession()?.token ?? null;
}

export function isAuthenticated(): boolean {
  return !!getSession();
}

// ---- simple pub/sub a.k.a event for auth changes ----
export function onAuthChange(cb: () => void) {
  if (!isClient()) return () => {};
  const handler = () => cb();
  window.addEventListener("storage", handler);
  window.addEventListener("dummy-auth:changed", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("dummy-auth:changed", handler);
  };
}

// ---- convenience: reset everything (dev only) ----
export function _dev_resetAll() {
  if (!isClient()) return;
  removeStorage(USERS_KEY);
  removeStorage(SESSION_KEY);
}

/*
  Caveats / Notes:
  - This module is client-side only (localStorage). Server-side code (getServerSideProps) cannot use it.
  - For multi-tab sync we use `storage` + custom event; changes in other tabs should reflect.
*/
