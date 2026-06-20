export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-red-600">
            FayerAutos
          </h3>
        </div>

        <div>
          <h4 className="font-bold mb-4">
            Minha Conta
          </h4>

          <p>Meus dados</p>
          <p>Meus pedidos</p>
        </div>

        <div>
          <h4 className="font-bold mb-4">
            Institucional
          </h4>

          <p>Sobre nós</p>
          <p>Contato</p>
        </div>

        <div>
          <h4 className="font-bold mb-4">
            Atendimento
          </h4>

          <p>0800 400 2000</p>
        </div>
      </div>
    </footer>
  );
}