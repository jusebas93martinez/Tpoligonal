import React, { useState } from "react";
import FormularioObservacion from "./components/FormularioObservacion";

import "./App.css";

function App() {
  const [observaciones, setObservaciones] = useState([]);

  const agregarObservacion = (observacion) => {
    setObservaciones([...observaciones, observacion]);
  };

  return (
    <div className="App">
      <h1>Cálculo de Poligonales</h1>
      <FormularioObservacion agregarObservacion={agregarObservacion} />
    </div>
  );
}

export default App;
