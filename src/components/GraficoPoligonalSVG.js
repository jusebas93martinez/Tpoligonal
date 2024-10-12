import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom"; // Pan y zoom para el SVG

const GraficoPoligonal = ({ observacionesCompensadas = [] }) => {
  const [colorLinea, setColorLinea] = useState("blue");
  const [grosorLinea, setGrosorLinea] = useState(2);
  const [colorPunto, setColorPunto] = useState("red");
  const [tamañoFlecha, setTamañoFlecha] = useState(10);
  const [colorFlecha, setColorFlecha] = useState("blue");
  const [mostrarFlecha, setMostrarFlecha] = useState(true);

  const anchoSVG = 550;
  const altoSVG = 550;
  const gridSpacing = 100; // Espaciado de la cuadrícula

  // Calcula los valores mínimos y máximos de las coordenadas ajustadas
  const minX = Math.min(
    ...observacionesCompensadas.map((p) => parseFloat(p.nuevoEsteAjustado))
  );
  const maxX = Math.max(
    ...observacionesCompensadas.map((p) => parseFloat(p.nuevoEsteAjustado))
  );
  const minY = Math.min(
    ...observacionesCompensadas.map((p) => parseFloat(p.nuevoNorteAjustado))
  );
  const maxY = Math.max(
    ...observacionesCompensadas.map((p) => parseFloat(p.nuevoNorteAjustado))
  );

  // Agrega un margen del 10% alrededor de los extremos
  const margen = 0.1; // 10% de margen

  const rangoX = (maxX - minX) * (1 + margen);
  const rangoY = (maxY - minY) * (1 + margen);

  // Calcula la escala para ajustar la poligonal al tamaño del SVG
  const escala = Math.min(anchoSVG / rangoX, altoSVG / rangoY);

  // Centra la poligonal en el SVG
  const offsetX = (anchoSVG - (maxX - minX) * escala) / 2;
  const offsetY = (altoSVG - (maxY - minY) * escala) / 2;

  // Función para escalar las coordenadas al tamaño del SVG
  const escalarX = (valor) => (valor - minX) * escala + offsetX;
  const escalarY = (valor) => altoSVG - (valor - minY) * escala - offsetY; // Invertir el eje Y para el SVG

  return (
    <div
      style={{
        position: "relative",
        border: "2px solid black",
        width: `${anchoSVG}px`,
        height: `${altoSVG}px`,
        padding: "10px",
      }}
    >
      {/* Controles flotantes, más compactos */}
      <div
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 10, // Asegura que esté encima del SVG
          fontSize: "10px", // Hacer más pequeños los controles
        }}
      >
        <label style={{ display: "block", marginBottom: "5px" }}>
          Color de la línea:
          <input
            type="color"
            value={colorLinea}
            onChange={(e) => setColorLinea(e.target.value)}
            style={{ width: "40%", marginTop: "3px" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Grosor de la línea:
          <input
            type="number"
            min="1"
            max="50"
            value={grosorLinea}
            onChange={(e) => setGrosorLinea(Number(e.target.value))}
            style={{ width: "30%", marginTop: "3px" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Color del punto:
          <input
            type="color"
            value={colorPunto}
            onChange={(e) => setColorPunto(e.target.value)}
            style={{ width: "40%", marginTop: "3px" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Tamaño de la flecha:
          <input
            type="number"
            min="5"
            max="40"
            value={tamañoFlecha}
            onChange={(e) => setTamañoFlecha(Number(e.target.value))}
            style={{ width: "30%", marginTop: "2px" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Color de la flecha:
          <input
            type="color"
            value={colorFlecha}
            onChange={(e) => setColorFlecha(e.target.value)}
            style={{ width: "40%", marginTop: "3px" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Mostrar flecha:
          <input
            type="checkbox"
            checked={mostrarFlecha}
            onChange={(e) => setMostrarFlecha(e.target.checked)}
            style={{ marginTop: "3px" }}
          />
        </label>
      </div>

      {/* Renderización del SVG con pan y zoom */}
      <UncontrolledReactSVGPanZoom
        width={anchoSVG}
        height={altoSVG}
        background="transparent"
        tool="auto"
        detectAutoPan={false}
        toolbarProps={{ position: "none" }} // Ocultar los botones de la herramienta
      >
        <svg width={anchoSVG} height={altoSVG} style={{ zIndex: 1 }}>
          <defs>
            <marker
              id="arrow"
              markerWidth={tamañoFlecha}
              markerHeight={tamañoFlecha}
              refX="10"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={colorFlecha} />
            </marker>
          </defs>

          {/* Renderización de la cuadrícula */}
          {/* Líneas verticales */}
          {Array.from({ length: anchoSVG / gridSpacing }).map((_, i) => (
            <line
              key={`v-grid-${i}`}
              x1={i * gridSpacing}
              y1={0}
              x2={i * gridSpacing}
              y2={altoSVG}
              stroke="#d3d3d3"
              strokeWidth="1"
            />
          ))}

          {/* Líneas horizontales */}
          {Array.from({ length: altoSVG / gridSpacing }).map((_, i) => (
            <line
              key={`h-grid-${i}`}
              x1={0}
              y1={i * gridSpacing}
              x2={anchoSVG}
              y2={i * gridSpacing}
              stroke="#d3d3d3"
              strokeWidth="1"
            />
          ))}

          {/* Renderización de los puntos escalados y sus IDs */}
          {observacionesCompensadas.map((p, index) => {
            const cx = escalarX(parseFloat(p.nuevoEsteAjustado));
            const cy = escalarY(parseFloat(p.nuevoNorteAjustado));
            return (
              <g key={index}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill={colorPunto}
                  data-tooltip-id={`tooltip-${index}`}
                  data-tooltip-content={`ID: ${p.id}\nNorte: ${p.nuevoNorteAjustado}\nEste: ${p.nuevoEsteAjustado}`}
                />
                {/* Texto del ID del punto */}
                <text x={cx + 5} y={cy - 5} fontSize="12" fill="black">
                  {p.id}
                </text>
              </g>
            );
          })}

          {/* Renderización de las líneas escaladas */}
          {observacionesCompensadas.map((p, index) => {
            if (index < observacionesCompensadas.length - 1) {
              const x1 = escalarX(parseFloat(p.nuevoEsteAjustado));
              const y1 = escalarY(parseFloat(p.nuevoNorteAjustado));
              const x2 = escalarX(
                parseFloat(
                  observacionesCompensadas[index + 1].nuevoEsteAjustado
                )
              );
              const y2 = escalarY(
                parseFloat(
                  observacionesCompensadas[index + 1].nuevoNorteAjustado
                )
              );
              return (
                <line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colorLinea}
                  strokeWidth={grosorLinea}
                  markerEnd={mostrarFlecha ? "url(#arrow)" : null}
                />
              );
            }
            return null;
          })}

          {/* Agregar la línea para cerrar la poligonal con la flecha invertida */}
          {observacionesCompensadas.length > 2 && (
            <line
              x1={escalarX(
                parseFloat(
                  observacionesCompensadas[observacionesCompensadas.length - 1]
                    .nuevoEsteAjustado
                )
              )}
              y1={escalarY(
                parseFloat(
                  observacionesCompensadas[observacionesCompensadas.length - 1]
                    .nuevoNorteAjustado
                )
              )}
              x2={escalarX(
                parseFloat(observacionesCompensadas[0].nuevoEsteAjustado)
              )}
              y2={escalarY(
                parseFloat(observacionesCompensadas[0].nuevoNorteAjustado)
              )}
              stroke={colorLinea}
              strokeWidth={grosorLinea}
              markerEnd={mostrarFlecha ? "url(#arrow)" : null} // Flecha inversa
            />
          )}
        </svg>
      </UncontrolledReactSVGPanZoom>

      {/* Renderiza los tooltips */}
      {observacionesCompensadas.map((_, index) => (
        <Tooltip key={index} id={`tooltip-${index}`} />
      ))}
    </div>
  );
};

export default GraficoPoligonal;
