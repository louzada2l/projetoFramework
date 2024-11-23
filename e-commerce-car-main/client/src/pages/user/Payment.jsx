import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Payment = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const { orderId, totalPrice } = location.state || {}; 

  // Função para lidar com a atualização do pagamento
  const handlePaymentPago = async () => {
    if (!orderId) {
      console.error("Pedido não encontrado!");
      alert("Erro: ID do pedido não encontrado.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/order/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Pago" }),
        }
      );

      const text = await response.text(); // Verifica resposta da API

      // Evita falha se a resposta estiver vazia
      let data = {};
      if (text) {
        data = JSON.parse(text);
      }

      if (response.ok) {
        setIsPaid(true);
      } else {
        console.error("Erro no backend:", data.error || "Erro desconhecido");
        alert("Erro ao processar pagamento. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      alert("Erro ao tentar realizar o pagamento.");
    }
  };

  // Função para setar os valores do formulário
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Função para renderizar o formulário de pagamento
  const renderPaymentForm = () => (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <form>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                onChange={handleInputChange(setFirstName)}
                placeholder="Primeiro nome"
                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={handleInputChange(setLastName)}
                placeholder="Último nome"
                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                onChange={handleInputChange(setEmail)}
                placeholder="Email"
                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                onChange={handleInputChange(setPhone)}
                placeholder="Telefone"
                className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
              />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Street address"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Zip Code"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-12">
            <div className="md:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked />
                  <label for="card" className="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                    <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                    <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                  <label for="paypal" className="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                  </label>
                </div>
              </div>

              <div className="grid sm:grid-cols-4 gap-4 mt-4">
                <div className="col-span-2">
                  <input
                    type="number"
                    placeholder="Card number"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="EXP."
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="CVV"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-red-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-4 mt-12">
            <button
              onClick={handlePaymentPago} // Chama a função para realizar o pagamento
              type="button"
              className="px-16 py-3 text-sm font-semibold tracking-wide bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Confirmar Pagamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="py-8">
      <Link className="mb-8 mt-8 underline mx-8" to="/home">
        Página inicial
      </Link>

      <div className="mt-4 flex flex-col items-center justify-center py-64">
        <p className="text-center text-gray-600 flex gap-2">
          Obrigado, <span className="first-letter:uppercase">{firstName}</span>
        </p>
        <p className="mt-4 text-green-500 text-xl mb-4">Pagamento efetuado com sucesso</p>
        <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512" className="mt-2">
          <path
            className="fill-green-500"
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm93.6-254.4L213.6 336a16 16 0 0 1-22.4-22.4l128-128a16 16 0 0 1 22.4 22.4z"
          />
        </svg>
      </div>
    </div>
  );

  return isPaid ? renderConfirmation() : renderPaymentForm();
};

export default Payment;
