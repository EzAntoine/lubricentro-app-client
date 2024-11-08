import {
  DevicePhoneMobileIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const SendOrderButton = ({ order }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    const message = `*${"Hola! Somos Lubricentro Maceratesi!"}*\n\nOrden de trabajo:\n\nFecha de ingreso: *${new Date(
      order.date
    ).toLocaleDateString()}*\nCliente: *${order.clientName}*\nTeléfono: *${
      order.clientPhone
    }*\nPatente: *${
      order.vehiclePlate
    }*\nMarca y modelo: *${"Marca y modelo"}*\nFalla: *${
      order.failure
    }*\nSolucion estimada: *${order.estimateSolution}*\nPresupuesto: $*${
      order.price
    }*\nObservaciones: *${order.observations}*`;

    window.open(
      `https://wa.me/${order.clientPhone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };
  return (
    <button
      onClick={clickHandler}
      className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm mt-2 mx-2 px-1 py-1 bg-gray-50 text-black text-sm font-medium hover:bg-[#15793a] hover:text-white"
    >
      Enviar
      <ArrowRightIcon className="ml-2 w-5 h-5" />
      <DevicePhoneMobileIcon className="w-5 h-5" />
    </button>
  );
};

export default SendOrderButton;
