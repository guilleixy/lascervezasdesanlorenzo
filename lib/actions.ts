// lib/actions.ts
"use server";

import { neon } from "@neondatabase/serverless";

export async function createEntry(formData: FormData) {
  const sql = neon(process.env.DATABASE_URL!);
  const name = formData.get("name");
  const time = parseFloat(formData.get("time") as string);
  const category = formData.get("category");

  if (!name || isNaN(time) || !category) return;

  await sql`INSERT INTO entries (name, time, category) VALUES (${name}, ${time}, ${category})`;
}
