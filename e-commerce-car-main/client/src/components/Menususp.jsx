import React, { useState } from 'react';

const carBrands = [
  'Sony PlayStation', 'Microsoft Xbox', 'Nintendo Switch', 'PC Gaming'
];

const DropdownWithSearch = ({ selectedBrand, onSelectBrand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSelectBrand = (brand) => {
    onSelectBrand(brand);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredBrands = carBrands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div 
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg rounded-md shadow-xl cursor-pointer hover:bg-gradient-to-l transition duration-300 ease-in-out"
        onClick={toggleDropdown}
      >
        {selectedBrand || "Escolha a sua plataforma favorita!"}
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-gray-900 text-white rounded-xl shadow-2xl z-10">
          <input
            type="text"
            className="w-full text-md px-6 py-3 border-b border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-t-xl"
            placeholder="Encontre sua plataforma..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <li
                  key={brand}
                  className="px-6 py-3 text-md text-gray-200 hover:bg-pink-500 hover:text-gray-900 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={() => handleSelectBrand(brand)}
                >
                  {brand}
                </li>
              ))
            ) : (
              <li className="px-6 py-3 text-gray-500">Nenhuma plataforma encontrada</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownWithSearch;
