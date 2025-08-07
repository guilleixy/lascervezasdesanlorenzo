// app/page.tsx
import { neon } from "@neondatabase/serverless";
import EntryClient from "@/components/EntryClient";

export default async function Page({
  searchParams,
}: {
  searchParams?: { name?: string; category?: string };
}) {
  const sql = neon(process.env.DATABASE_URL!);

  const name = searchParams?.name;
  const category = searchParams?.category;

  let query = "SELECT * FROM entries";
  const values: any[] = [];
  const conditions = [];

  if (category && category !== "all") {
    values.push(category);
    conditions.push(`category = $${values.length}`);
  }

  if (name) {
    values.push(`%${name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY time ASC";
  const entries = await sql.query(query, values);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏆 Tiempos de bebida</h1>
      <EntryClient initialEntries={entries} />
    </main>
  );
}
