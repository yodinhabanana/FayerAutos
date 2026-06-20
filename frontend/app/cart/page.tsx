import OrderItemsGrid from "@/components/cart/OrderItemsGrid";
import Footer from "@/components/home/Footer";
import Header from "@/components/cart/Header";

export default function CartPage() {

     

  return (
    <main className="flex flex-col justify-between min-h-screen bg-white">
        <Header />

        <OrderItemsGrid orderId={1} />

        <Footer />
    
    </main>
  );
}
