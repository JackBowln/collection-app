import type { User } from "@prisma/client";

export type Collection = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  data: any; // Assuming Json type can be any valid JSON value
  authorId: number;
  author: User;
  fields: Field[];
};
// model Collection {
// }


export type Field = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  label: string;
  type: FieldType;
  placeholder?: string | null;
  name: string;
  Collection?: Collection | null;
  collectionId?: number | null;
};


enum FieldType {
  text = "text",
  number = "number",
  date = "date",
  email = "email",
  url = "url",
  tel = "tel",
  password = "password",
  radio = "radio",
  file = "file",
  image = "image",
  month = "month",
  range = "range",
  time = "time",
  week = "week",
  color = "color",
}
