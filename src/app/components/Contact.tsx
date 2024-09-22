export default function Contact() {
  return (
    <section id="contact">
      <div className="w-full p-8 bg-[#2ccc71] bg-opacity-20">
        <h2 className="text-left text-4xl font-bold text-white md:mb-12">
          Contacto
        </h2>
        <div className="text-gray-300 font-bold text-base sm:text-lg mb-6 lg:text-xl px-24 text-balance">
          <span>Escribinos por Whatsapp BOTON</span>
          <h3 className="text-2xl mt-4">Redes Sociales</h3>
          <div className="container mx-auto flex flex-col items-center">
            <ul className="flex space-x-4">
              <li>LOGO lubricentro@gmail.com</li>
              <li>LOGO @Instagram</li>
              <li>LOGO TikTok</li>
            </ul>
          </div>
          <h3 className="text-2xl mt-4">Ubicacion</h3>
          <h4 className="text-center text-xl">
            Calle 123, Bahia Blanca (B8000), Buenos Aires, Argentina
          </h4>
          <div>MAPA DE GOOGLE CON UBICACION</div>
        </div>
      </div>
    </section>
  );
}
