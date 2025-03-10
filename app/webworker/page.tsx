"use client";

import { useState, useEffect } from "react";
import { pow_3 } from "../utils/calculations";

// Définition des types
interface CalculationResult {
  result: number;
  duration: string;
}

export default function WebWorker() {
  const [number, setNumber] = useState<number>(100);
  const [text, setText] = useState<string>("");
  const [mainThreadResult, setMainThreadResult] =
    useState<CalculationResult | null>(null);
  const [workerResult, setWorkerResult] = useState<CalculationResult | null>(
    null
  );
  const [mainThreadRunning, setMainThreadRunning] = useState<boolean>(false);
  const [workerRunning, setWorkerRunning] = useState<boolean>(false);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    // Initialiser le worker uniquement côté client
    if (typeof window !== "undefined") {
      const workerInstance = new Worker("/workers/pow3Worker.js");
      setWorker(workerInstance);

      workerInstance.onmessage = function (e: MessageEvent) {
        console.log("Page: message reçu du worker", e.data);
        const data = e.data as {
          result?: number;
          duration?: number;
          error?: string;
        };

        if (data.error) {
          console.error("Page: erreur reçue du worker", data.error);
          setWorkerResult(null);
        } else if (data.result !== undefined && data.duration !== undefined) {
          setWorkerResult({
            result: data.result,
            duration: data.duration.toFixed(2),
          });
        } else {
          console.error("Page: format de données inattendu", data);
        }

        setWorkerRunning(false);
      };

      workerInstance.onerror = function (error) {
        console.error("Page: erreur dans le worker", error);
        setWorkerRunning(false);
      };

      return () => {
        workerInstance.terminate();
      };
    }
  }, []);

  const runMainThreadCalculation = (): void => {
    setMainThreadRunning(true);
    setMainThreadResult(null);

    // Utiliser setTimeout pour permettre à l'UI de se mettre à jour avant le calcul
    setTimeout(() => {
      const startTime = performance.now();
      const result = pow_3(number);
      const endTime = performance.now();
      const duration = endTime - startTime;

      setMainThreadResult({
        result: result,
        duration: duration.toFixed(2),
      });
      setMainThreadRunning(false);
    }, 10);
  };

  const runWorkerCalculation = (): void => {
    if (worker) {
      setWorkerRunning(true);
      setWorkerResult(null);
      console.log("Page: envoi de la valeur au worker", number);
      worker.postMessage(number);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        TP1 - Web Worker: Comparaison de performance
      </h1>

      <div className="mb-4">
        <label className="block mb-2">Nombre pour la puissance de 3:</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
          className="border p-2 w-full"
          min="1"
          max="1000"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={runMainThreadCalculation}
          disabled={mainThreadRunning}
          className={`px-4 py-2 ${
            mainThreadRunning ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded`}
        >
          {mainThreadRunning
            ? "Calcul en cours..."
            : "Exécuter dans le thread principal"}
        </button>

        <button
          onClick={runWorkerCalculation}
          disabled={workerRunning || !worker}
          className={`px-4 py-2 ${
            workerRunning || !worker
              ? "bg-gray-400"
              : "bg-green-500 hover:bg-green-600"
          } text-white rounded`}
        >
          {workerRunning ? "Calcul en cours..." : "Exécuter dans un Web Worker"}
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2">
          Zone de saisie de test (pour vérifier la réactivité):
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full h-32"
          placeholder="Essayez de taper ici pendant que les calculs s'exécutent..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-2">
            Résultat Thread Principal
          </h2>
          {mainThreadRunning ? (
            <p>Calcul en cours...</p>
          ) : mainThreadResult ? (
            <div>
              <p>Résultat: {mainThreadResult.result}</p>
              <p>Durée: {mainThreadResult.duration} ms</p>
            </div>
          ) : (
            <p>Pas encore calculé</p>
          )}
        </div>

        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-2">Résultat Web Worker</h2>
          {workerRunning ? (
            <p>Calcul en cours...</p>
          ) : workerResult ? (
            <div>
              <p>Résultat: {workerResult.result}</p>
              <p>Durée: {workerResult.duration} ms</p>
            </div>
          ) : (
            <p>Pas encore calculé</p>
          )}
        </div>
      </div>
    </div>
  );
}
