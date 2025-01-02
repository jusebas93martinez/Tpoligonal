import React, { useState } from "react";

const Login = ({ setIsAuthenticated, onLogin }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      setIsAuthenticated(true);
      if (onLogin) {
        onLogin(nombre);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 border border-gray-200 rounded-lg bg-gray-50"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Ingresar
        </button>
      </form>

      <p className="mt-6 text-gray-600">Creado por Sebastian Martinez</p>
    </div>
  );
};

export default Login;
