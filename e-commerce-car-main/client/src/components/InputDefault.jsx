import React from "react";

const InputDefault = ({ onChange, value, id, name, type = "text", placeholder, error }) => {
  return (
    <div className="flex flex-col">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full px-2 py-1.5 text-gray-900 rounded-md border-0 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 sm:text-sm focus:ring-inset ${
          error ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-red-600"
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputDefault;
