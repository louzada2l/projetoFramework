import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";

const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); 
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const handleGetDetail = async () => {
    setLoading(true); 
    setError(null);   

    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (!response.ok) throw new Error("Produto não encontrado");
      
      const data = await response.json();
      setProduct(data);
      if (data.ProductImages && data.ProductImages.length > 0) {
        setMainImage(data.ProductImages[0].url);
      }
      console.log("Detalhes do produto", data);
    } catch (error) {
      setError("Erro ao buscar detalhes do produto.");
      console.error("Erro ao buscar detalhes do produto: ", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    handleGetDetail();
  }, [id]);

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>{error}</p>;

  if (!product) return <p>Produto não encontrado.</p>;

  const { model, brand, price, ProductImages, engine, power, description } = product;

  return (
    <div>
      <NavBar />
      <section className="flex min-h-screen justify-center items-center pt-32">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
            <div className="img">
              <div className="img-box max-lg:mx-auto">
                <img
                  src={mainImage}
                  alt={model}
                  className="w-96 mx-auto h-full object-cover"
                />
              </div>
              <div className="flex mt-4 space-x-2 overflow-x-auto">
                {ProductImages.map((img, index) => (
                  <img
                    key={img.id}
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 object-cover cursor-pointer transition-transform transform hover:scale-100 hover:border-4 hover:border-gray-300 hover:shadow-lg"
                    onClick={() => setMainImage(img.url)}
                  />
                ))}
              </div>
            </div>
            <div className="data w-full my-110 lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-2xl">
                <div className="flex justify-between mb-8">
                  <span className="flex flex-col justify-center">
                    <h2 className="font-bold text-3xl text-gray-900 mb-4">
                      {model}
                    </h2>
                    <span className="border-b border-red-500 py-1 px-4">
                      {brand}
                    </span>
                  </span>

                  <h6 className="font-semibold text-2xl leading-9 text-gray-900 pr-5 mr-5 mt-2">
                    {formatPrice(price)}
                  </h6>
                </div>

                <ul className="text-gray-500 list-disc px-4">
                  <li>{engine}</li>
                  <li>{power} CV</li>
                </ul>

                <div className="text-gray-500 text-base font-normal mt-12 border border-gray-200 rounded p-4 mb-32">
                  {description.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
