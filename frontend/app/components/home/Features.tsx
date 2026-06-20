const items = [
  {
    title: "Frete grátis",
    subtitle: "Para todo o Brasil"
  },
  {
    title: "Preços baixos",
    subtitle: "Para qualquer bolso"
  },
  {
    title: "Atendimento",
    subtitle: "Rápido e fácil"
  }
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-gray-100 p-8 rounded-lg text-center"
          >
            <h3 className="font-bold text-xl">
              {item.title}
            </h3>

            <p className="text-gray-500">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}