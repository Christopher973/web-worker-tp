import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        TP Web Worker et Shared Worker
      </h1>

      <div className="flex flex-col gap-4">
        <Link
          href="/webworker"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Démo Web Worker Simple
        </Link>

        <Link
          href="/multiply"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Démo Shared Worker - Multiplication
        </Link>

        <Link
          href="/square"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Démo Shared Worker - Carré
        </Link>
      </div>
    </div>
  );
}
