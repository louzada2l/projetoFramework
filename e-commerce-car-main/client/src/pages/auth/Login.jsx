import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../../assets/logo2.webp";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });
  
      const data = response.data;
      console.log('Response from API:', data);
      localStorage.setItem("userId", data.ID);
      localStorage.setItem("userRole", data.role);
      console.log(localStorage.getItem("userId"));
      console.log(localStorage.getItem("userRole"));
  
      if (!data.token) {
        console.error('Token não encontrado na resposta.');
        return;
      }
  
      localStorage.setItem('token', data.token);
      if (data.userId) {
        localStorage.setItem('userId', data.id);
        localStorage.setItem("userRole", data.role);
      }
  
      console.log('User Role:', data.role); 
   
      if (data.role === "admin") {
        console.log('Navegando para /admin');
        navigate('/admin');
      } else {
        console.log('Navegando para /');
        navigate('/home');
      }
  
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-white">
            Acesse sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
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
                  className="block w-full rounded-md outline-none px-4 py-2 text-gray-900 placeholder:text-gray-500 ring-2 ring-inset ring-purple-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-lg"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-blue-500 transition duration-300"
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-gray-300">
            Não tem conta?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 hover:text-blue-500"
            >
              Cadastre-se agora
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
