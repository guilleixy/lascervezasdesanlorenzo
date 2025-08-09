"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const categories = ["Cerveza 0.33L", "Vino 0.33L"];

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

  const medalBorderClasses = [
    "border-2 border-[#D4AF37] rounded-md", // oro
    "border-2 border-[#C0C0C0] rounded-md", // plata
    "border-2 border-[#CD7F32] rounded-md", // bronce
  ];

  const getCategoryIcon = (category: string) => {
    if (!category) return null;
    const c = category.toLowerCase();
    if (c.includes("cerveza")) return "🍺";
    if (c.includes("vino")) return "🍷";
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Lista */}
      <ul className="space-y-2">
        {entries.length === 0 ? (
          <p>No hay resultados.</p>
        ) : (
          entries.map((e, i) => (
            <li
              key={e.id ?? i}
              className={`flex items-center gap-3 p-3 ${
                i < 3 ? medalBorderClasses[i] : ""
              }`}
            >
              {getCategoryIcon(e.category) && (
                <span aria-hidden="true" className="text-lg">
                  {getCategoryIcon(e.category)}
                </span>
              )}
              <div className="flex-1 flex flex-row items-center gap-2">
                <div>{i + 1}º</div>
                <div className="font-semibold">{e.name}</div>
                <div className="text-sm">{e.time}s</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
