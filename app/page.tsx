import { neon } from "@neondatabase/serverless";
import EntryClient from "@/components/EntryClient";

export default async function Page({ searchParams }: any) {
  const sql = neon(process.env.DATABASE_URL!);

  const params = await searchParams;

  const name = params.name;
  const category = params.category;

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

  const entries = await sql.query(query, values); // ⚠️ usa `.query`

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center font-barrio">
        Las cañas de San Lorenzo
      </h1>
      <EntryClient initialEntries={entries} />
    </main>
  );
}
