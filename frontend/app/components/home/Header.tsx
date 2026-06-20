import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <button className="text-2xl">
          ☰
        </button>

        <h1 className="-p-12 text-3xl font-bold text-red-600">
          <Image src="/logo2.png" alt="FayerAutos" width={150} height={50} />
        </h1>

        <input
          type="text"
          placeholder="O que você procura?"
          className="flex-1 rounded-full px-5 py-3 text-black bg-white"
        />

        <button>⚙️</button>

        <button>🛒</button>
      </div>
    </header>
  );
}