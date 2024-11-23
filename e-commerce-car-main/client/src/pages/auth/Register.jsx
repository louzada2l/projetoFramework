import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../../assets/logo2.webp";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('user'); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/auth/register', {
        name: name,
        email: email,
        password: password,
        role, 
      });

      navigate("/");
    } catch (error) {
      console.error('Erro durante o registro', error);
      setError(error.response?.data?.error || 'Erro ao registrar');
    }
  };

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-white">
            Crie sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <p className="text-red-600 text-center">{error}</p>}
          <form onSubmit={handleRegister} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-white"
              >
                Nome Completo
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Digite seu nome completo"
                  className="block w-full outline-none px-4 py-2 rounded-md text-gray-900 placeholder:text-gray-500 ring-2 ring-inset ring-purple-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-white"
              >
                E-mail
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                  className="block w-full outline-none px-4 py-2 rounded-md text-gray-900 placeholder:text-gray-500 ring-2 ring-inset ring-purple-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-lg"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-white"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  className="block w-full outline-none px-4 py-2 rounded-md text-gray-900 placeholder:text-gray-500 ring-2 ring-inset ring-purple-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-lg"
                />
              </div>
            </div>

            <div className="space-x-4 text-white">
              <input 
                type="radio" 
                id="admin" 
                name="role" 
                value="admin" 
                checked={role === 'admin'} 
                onChange={() => setRole('admin')} 
              />
              <label htmlFor="admin" className="text-green-400">Sou Administrador</label>
              
              <input 
                type="radio" 
                id="user" 
                name="role" 
                value="user" 
                checked={role === 'user'} 
                onChange={() => setRole('user')} 
              />
              <label htmlFor="user" className="text-green-400">Sou Usuário</label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-blue-500 transition duration-300"
              >
                Cadastrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-gray-300">
            Já tem uma conta?{" "}
            <Link
              to="/"
              className="font-semibold text-blue-400 hover:text-blue-500"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
