export default function Brands() {
  const brands = [
    "BOSCH",
    "FRASLE",
    "EXEDY",
    "SKF",
    "CONTINENTAL"
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-4xl font-bold mb-10">
        As melhores marcas
      </h2>

      <div className="flex justify-center gap-12 flex-wrap">
        {brands.map((brand) => (
          <div
            key={brand}
            className="text-3xl font-bold text-red-600"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}