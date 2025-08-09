"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { createEntry } from "@/lib/actions";

const categories = ["Cerveza 0.33L"];

export default function EntryClient({
  initialEntries,
}: {
  initialEntries: any[];
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchEntries = async () => {
    const name = searchParams.get("name") || "";
    const category = searchParams.get("category") || "";
    const query = new URLSearchParams({ name, category }).toString();
    const res = await fetch(`/entries?${query}`);
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = (e.target as any).name.value;
          const category = (e.target as any).category.value;
          const params = new URLSearchParams();
          if (name) params.set("name", name);
          if (category && category !== "all") params.set("category", category);
          startTransition(() => {
            router.push(`/?${params.toString()}`);
          });
        }}
        className="space-x-2"
      >
        <input
          name="name"
          placeholder="Nombre"
          className="border p-2 rounded"
          defaultValue={searchParams.get("name") || ""}
        />
        <select
          name="category"
          className="border p-2 rounded"
          defaultValue={searchParams.get("category") || "all"}
        >
          <option value="all">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filtrar
        </button>
      </form> */}

      {/* Lista */}
      <ul className="space-y-2">
        {entries.length === 0 ? (
          <p>No hay resultados.</p>
        ) : (
          entries.map((e) => (
            <li key={e.id} className="border p-2 rounded">
              <strong>{e.name}</strong>: {e.time}s – <em>{e.category}</em>
            </li>
          ))
        )}
      </ul>

      {/* Formulario para añadir */}
      <form
        action={async (formData) => {
          await createEntry(formData);
          router.refresh(); // actualiza los datos
        }}
        className="space-y-2 border-t pt-4"
      >
        <h2 className="text-xl font-semibold">Añadir tiempo</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
          className="block border p-2 rounded w-full"
        />
        <input
  type="text"
  name="time"
  pattern="[0-9]+([.,][0-9]{1,2})?"
  placeholder="Tiempo (segundos)"
  required
  class="block border p-2 rounded w-full"
/>
        <select name="category" className="block border p-2 rounded w-full">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
