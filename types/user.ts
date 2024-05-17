import type { Post } from "@prisma/client";
import type { Collection } from "./collection";

export type User = {
  id: number;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
  accounts?: Account[];
  sessions?: Session[];
  Collection?: Collection[];
  Profile?: Profile | null;
};

export type Account = {
  id: number;
  userId: number;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  oauth_token_secret?: string | null;
  oauth_token?: string | null;
};

export type Session = {
  id: number;
  sessionToken: string;
  expires: Date;
};

export type Profile = {
  id: number;
  bio?: string | null;
  user?: User;
};
