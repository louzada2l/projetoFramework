import { useEffect, useState } from "react";

const ItemCart = ({ product, onUpdate, onDelete, userID }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);

  // Função para atualizar a quantidade no backend
  const updateQuantity = async (newQuantity) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${userID}/${product.id}/update`, {  
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar item no carrinho');
      }

      const data = await response.json();
      console.log('Item atualizado com sucesso:', data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para manipular as mudanças na quantidade
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  // Atualiza a quantidade no backend sempre que o estado de 'quantity' mudar
  useEffect(() => {
    if (quantity !== product.quantity) {
      updateQuantity(quantity);
    }
  }, [quantity]);

  // URL da imagem do produto (com fallback)
  const imageUrl = product.ProductImages && product.ProductImages.length > 0
    ? product.ProductImages[0].url
    : "https://pagedone.io/asset/uploads/1701162826.png";

  // Função para remover o item do carrinho
  const handleRemoveItem = () => {
    console.log("Removendo item:", product.id);
    onDelete(product.id);
  };

  return (
    <div className="rounded-lg border-2 border-gray-200 p-4 lg:pt-8 lg:px-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 gap-x-4">
      {/* Imagem do Produto */}
      <div className="col-span-12 lg:col-span-2 img box">
        <img
          src={imageUrl}
          alt={product.model}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      
      {/* Detalhes do Produto */}
      <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-medium text-2xl first-letter:uppercase mb-2 leading-9 text-gray-900">
            {product.model}
          </h2>
        </div>
        <span className="px-4 py-1 text-base rounded-md bg-red-100 text-red-700">
          {product.brand}
        </span>
        
        {/* Quantidade, Remover Item e Preço */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
              className="w-16 text-center border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            onClick={handleRemoveItem}
            className="text-red-600 font-semibold hover:text-red-800 ml-4"
          >
            Remover
          </button>

          <h6 className="text-red-600 font-bold text-xl leading-9 text-right ml-auto">
            R$ {(product.price * quantity).toFixed(2)}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
