import type { User } from "@prisma/client";

type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content?: string | null;
  published: boolean;
  viewCount: number;
  author?: User | null;
  authorId?: number | null;
};
