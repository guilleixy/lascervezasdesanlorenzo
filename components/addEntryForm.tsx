"use client";

import { useRouter } from "next/navigation";
import { createEntry } from "@/lib/actions";

const categories = ["Cerveza 0.33L", "Vino 0.33L"];

export default function AddEntryForm() {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await createEntry(formData);
        router.refresh(); // refresca la lista
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
        className="block border p-2 rounded w-full"
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
  );
}
