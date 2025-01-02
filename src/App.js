import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioObservacion from "./components/FormularioObservacion";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [observaciones, setObservaciones] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const agregarObservacion = (observacion) => {
    setObservaciones([...observaciones, observacion]);
  };

  return (
    <Router basename="/Tpoligonal">
      <div className="App">
        <h1 style={{ margin: "5px 0", padding: "0" }}>Cálculo de Poligonal</h1>
        <Routes>
          {/* Ruta principal de Login */}
          <Route
            path="/"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Nueva ruta para /Tpoligonal */}
          <Route
            path="/Tpoligonal"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Ruta protegida para el formulario */}
          <Route
            path="/formulario"
            element={
              isAuthenticated ? (
                <FormularioObservacion
                  agregarObservacion={agregarObservacion}
                />
              ) : (
                <p>Debes iniciar sesión para ver esta página</p>
              )
            }
          />

          {/* Ruta por defecto en caso de que no coincida ninguna */}
          <Route
            path="*"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
