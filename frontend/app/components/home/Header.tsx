export default function Header() {
  return (
    <header className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <button className="text-2xl">
          ☰
        </button>

        <h1 className="text-3xl font-bold text-red-600">
          FayerAutos
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