import Image from "next/image";

export default function Brands() {
  const brands = [
    "/brands/BOSCH.png", 
    "/brands/NAKATA.png",
    "/brands/EXEDY.png",
    "/brands/SKF.png",
    "/brands/CONTINENTAL.png"
  ];

  return (
    <section className="py-12">
      <div className="flex justify-center gap-12 flex-wrap">
        {brands.map((brand) => (
          <div
            key={brand}
            className="text-3xl font-bold text-red-600"
          >
            <Image src={brand} alt="Brand" width={180} height={100} />
          </div>
        ))}
      </div>
    </section>
  );
}