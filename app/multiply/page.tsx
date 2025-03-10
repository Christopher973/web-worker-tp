"use client";

import { useEffect, useRef } from "react";
import { setupMultiplyWorker } from "./multiply";

export default function MultiplyPage() {
  const num1Ref = useRef<HTMLInputElement>(null);
  const num2Ref = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      num1Ref.current &&
      num2Ref.current &&
      resultRef.current
    ) {
      // Initialiser le worker uniquement côté client
      setupMultiplyWorker(num1Ref.current, num2Ref.current, resultRef.current);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Multiplication avec Shared Worker
      </h1>

      <div className="mb-4">
        <p className="mb-2">
          Cette page utilise le même Shared Worker que la page de calcul de
          carré.
        </p>
        <p className="mb-4">
          Ouvrez les deux pages simultanément pour voir le Shared Worker en
          action.
        </p>

        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <label htmlFor="num1" className="block mb-1">
              Premier nombre:
            </label>
            <input
              type="number"
              id="num1"
              ref={num1Ref}
              defaultValue="5"
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label htmlFor="num2" className="block mb-1">
              Deuxième nombre:
            </label>
            <input
              type="number"
              id="num2"
              ref={num2Ref}
              defaultValue="10"
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
          href="/square"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Aller à la page de calcul de carré
        </a>
      </div>
    </div>
  );
}
