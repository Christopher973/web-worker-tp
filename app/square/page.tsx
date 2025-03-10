"use client";

import { useEffect, useRef } from "react";
import { setupSquareWorker } from "./square";

export default function SquarePage() {
  const numRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && numRef.current && resultRef.current) {
      // Initialiser le worker uniquement côté client
      setupSquareWorker(numRef.current, resultRef.current);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Calcul de carré avec Shared Worker
      </h1>

      <div className="mb-4">
        <p className="mb-2">
          Cette page utilise le même Shared Worker que la page de
          multiplication.
        </p>
        <p className="mb-4">
          Ouvrez les deux pages simultanément pour voir le Shared Worker en
          action.
        </p>

        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <label htmlFor="num" className="block mb-1">
              Nombre:
            </label>
            <input
              type="number"
              id="num"
              ref={numRef}
              defaultValue="8"
              className="border p-2 w-full rounded"
            />
          </div>

          <div ref={resultRef} className="p-4 border rounded bg-gray-50 mt-2">
            Résultat: 0
          </div>
        </div>
      </div>

      <div className="mt-6">
        <a
          href="/multiply"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Aller à la page de multiplication
        </a>
      </div>
    </div>
  );
}
