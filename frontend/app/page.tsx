import CategoryBar from "./components/home/CategoryBar";
import ProductGrid from "./components/home/ProductGrid";

export default function Home() {
  return (
    <main>
      <header>
        <h1>FayerAutos</h1>
      </header>

      <CategoryBar />

      <section>
        <h2>Banner Principal</h2>
      </section>

      <section>
        <h2>Mais vendidos</h2>
        <ProductGrid />
      </section>
    </main>
  );
}