import React, { useState } from "react";
import GraficoPoligonalSVG from "./GraficoPoligonalSVG";

const FormularioObservacion = ({ agregarObservacion }) => {
  // Estados para coordenadas y observaciones
  const [norteInicial, setNorteInicial] = useState("");
  const [esteInicial, setEsteInicial] = useState("");
  const [norteVisado, setNorteVisado] = useState("");
  const [esteVisado, setEsteVisado] = useState("");

  const [azimutInicial, setAzimutInicial] = useState(null); // Estado para el azimut inicial
  const [distanciaInicial, setDistanciaInicial] = useState(null); // Estado para la distancia inicial
  const [coordenadasCalculadas, setCoordenadasCalculadas] = useState(false); // Para controlar si ya calculaste las coordenadas

  // Estados para los ángulos y la distancia observada
  const [gradosH, setGradosH] = useState("");
  const [minutosH, setMinutosH] = useState("");
  const [segundosH, setSegundosH] = useState("");

  const [gradosV, setGradosV] = useState("");
  const [minutosV, setMinutosV] = useState("");
  const [segundosV, setSegundosV] = useState("");

  const [distanciaObservada, setDistanciaObservada] = useState("");
  const [alturaInicial, setAlturaInicial] = useState(""); // Nueva variable para la altura inicial

  const [nuevoAzimut, setNuevoAzimut] = useState(null); // Estado para el nuevo azimut calculado

  const [sumaTeorica, setSumaTeorica] = useState(0);
  const [sumaReal, setSumaReal] = useState(0);
  const [errorAngular, setErrorAngular] = useState(0);

  const [sentidoPoligonal, setSentidoPoligonal] = useState("internos"); // 'internos' o 'externos'
  const [observacionesCompensadas, setObservacionesCompensadas] = useState([]); // Para las observaciones ajustadas
  // Suponiendo que tienes estos estados definidos en algún lugar del componente
  const [brazoExterno, setBrazoExterno] = useState(false); // Por defecto, el brazo es interno
  const [cierreAlturas, setCierreAlturas] = useState(0); // Estado para almacenar el cierre de alturas

  const calcularCierreAlturas = (observacionesActualizadas) => {
    if (observacionesActualizadas.length === 0) {
      setCierreAlturas(0); // Si no hay observaciones, el cierre de alturas es 0
      return 0;
    }

    // Filtrar las observaciones según el tipo de brazo
    const observacionesAConsiderar = brazoExterno
      ? observacionesActualizadas.slice(1) // Si es brazo externo, omitimos la primera observación
      : observacionesActualizadas; // Si es brazo interno, usamos todas las observaciones

    // Calcular la sumatoria de las distancias verticales reales (valor absoluto)
    const sumatoriaDistanciasVerticales = observacionesAConsiderar.reduce(
      (acumulado, obs) =>
        acumulado +
        parseFloat(obs.distanciaVertical) + // Tomamos el valor absoluto de la distancia vertical
        parseFloat(obs.alturaInstrumental) -
        parseFloat(obs.alturaPrisma),
      0
    );

    console.log(
      `\nSumatoria de Distancias Verticales Calculadas: ${sumatoriaDistanciasVerticales.toFixed(
        4
      )}`
    );

    // Guardar y retornar el cierre de alturas manteniendo el signo
    const cierreAlturas = sumatoriaDistanciasVerticales.toFixed(4);
    setCierreAlturas(cierreAlturas);

    console.log(`Cierre de alturas calculado: ${cierreAlturas}`);

    return parseFloat(cierreAlturas); // Retornamos el valor numérico con su signo
  };

  const calcularCierreAngular = (observaciones, sentidoPoligonal) => {
    const N = observaciones.length;
    if (N === 0) return;

    // Inicializamos la sumatoria de los ángulos con 0° 0' 0"
    let sumaReal = { grados: 0, minutos: 0, segundos: 0 };

    // Contador para rastrear el número de observaciones
    let contadorObservaciones = 0;

    // Bandera para saber si ya hemos inicializado la suma con la segunda observación
    let sumatoriaInicializada = false;

    // Iteramos sobre las observaciones
    observaciones.forEach((obs) => {
      contadorObservaciones++; // Incrementamos el contador por cada observación

      // Si es la primera observación y el brazo es externo, la ignoramos
      if (contadorObservaciones === 0 && brazoExterno) {
        return; // Salta la primera observación
      }

      // Convertir los valores del ángulo de la observación actual
      const angulo = {
        grados: Number(obs.gradosH),
        minutos: Number(obs.minutosH),
        segundos: Number(obs.segundosH),
      };

      // Si es la segunda observación y la primera fue omitida, inicializamos la sumatoria
      if (
        contadorObservaciones === 0 &&
        brazoExterno &&
        !sumatoriaInicializada
      ) {
        sumaReal = angulo; // Iniciamos la sumatoria con el ángulo de la segunda observación
        sumatoriaInicializada = true; // Marcamos que ya hemos inicializado la sumatoria
      } else {
        // Para todas las demás observaciones, sumamos los ángulos normalmente
        sumaReal = sumarAngulos(sumaReal, angulo);
      }
    });

    // Calculamos la suma teórica dependiendo del tipo de poligonal
    let sumaTeorica;
    if (sentidoPoligonal === "internos") {
      sumaTeorica = { grados: (N - 2) * 180, minutos: 0, segundos: 0 };
    } else {
      sumaTeorica = { grados: (N + 2) * 180, minutos: 0, segundos: 0 };
    }

    // Calculamos el error angular
    const errorAngular = restarAngulos(sumaTeorica, sumaReal);

    // Actualizamos los estados con los valores finales
    setSumaTeorica(sumaTeorica);
    setSumaReal(sumaReal);
    setErrorAngular(errorAngular);
  };

  const sumarAngulos = (a1, a2) => {
    let segundos = Number(a1.segundos) + Number(a2.segundos);
    let minutos = Number(a1.minutos) + Number(a2.minutos);
    let grados = Number(a1.grados) + Number(a2.grados);

    // Ajustar segundos si exceden 60
    if (segundos >= 60) {
      minutos += Math.floor(segundos / 60);
      segundos = segundos % 60;
    }

    // Ajustar minutos si exceden 60
    if (minutos >= 60) {
      grados += Math.floor(minutos / 60);
      minutos = minutos % 60;
    }

    return { grados, minutos, segundos };
  };

  const convertirAGradosDecimales = (grados, minutos, segundos) => {
    return grados + minutos / 60 + segundos / 3600;
  };

  const restarAngulos = (a1, a2) => {
    // Convertir los ángulos a grados decimales para compararlos
    const angulo1Decimal = convertirAGradosDecimales(
      a1.grados,
      a1.minutos,
      a1.segundos
    );
    const angulo2Decimal = convertirAGradosDecimales(
      a2.grados,
      a2.minutos,
      a2.segundos
    );

    // Determinar cuál es el mayor y el menor
    let mayor, menor;
    if (angulo1Decimal >= angulo2Decimal) {
      mayor = a1;
      menor = a2;
    } else {
      mayor = a2;
      menor = a1;
    }

    // Restar ángulos (siempre mayor - menor)
    let segundos = mayor.segundos - menor.segundos;
    let minutos = mayor.minutos - menor.minutos;
    let grados = mayor.grados - menor.grados;

    // Si los segundos son negativos, pedir prestado 1 minuto
    if (segundos < 0) {
      segundos += 60;
      minutos -= 1;
    }

    // Si los minutos son negativos, pedir prestado 1 grado
    if (minutos < 0) {
      minutos += 60;
      grados -= 1;
    }

    return { grados, minutos, segundos };
  };

  // Función para convertir GMS a grados decimales
  const convertirGMSToDecimal = (grados, minutos, segundos) => {
    return (
      parseFloat(grados) +
      parseFloat(minutos) / 60 +
      parseFloat(segundos) / 3600
    );
  };
  const convertirDecimalAGMS = (gradosDecimales) => {
    const grados = Math.floor(gradosDecimales); // Parte entera para los grados
    const minutosDecimales = (gradosDecimales - grados) * 60;
    const minutos = Math.floor(minutosDecimales); // Parte entera para los minutos
    const segundos = Math.round((minutosDecimales - minutos) * 60); // Redondear los segundos a enteros

    return `${grados}° ${minutos}' ${segundos}"`;
  };

  // Estado para almacenar todas las observaciones
  const [observaciones, setObservaciones] = useState([]);

  // Estados para las alturas
  const [alturaInstrumental, setAlturaInstrumental] = useState("");
  const [alturaPrisma, setAlturaPrisma] = useState("");

  // Estado para almacenar la precisión de la poligonal
  const [precisionPoligonal, setPrecisionPoligonal] = useState(0);

  // Estado para el ID de la observación
  const [idObservacion, setIdObservacion] = useState("");

  // Función para calcular el azimut inicial y la distancia a partir de coordenadas
  const calcularAzimutYDistanciaDesdeCoordenadas = (
    norteInicial,
    esteInicial,
    norteVisado,
    esteVisado
  ) => {
    const deltaX = parseFloat(esteVisado) - parseFloat(esteInicial);
    const deltaY = parseFloat(norteVisado) - parseFloat(norteInicial);

    // Azimut inicial en grados
    let azimutRad = Math.atan2(deltaX, deltaY);
    let azimutDeg = azimutRad * (180 / Math.PI); // Convertimos de radianes a grados

    // Ajustar el azimut para que esté en el rango de 0 a 360 grados
    if (azimutDeg < 0) {
      azimutDeg += 360;
    } else if (azimutDeg >= 360) {
      azimutDeg -= 360;
    }

    // Calcular la distancia entre D1 y D2
    const distancia = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    // Retornar el azimut y la distancia
    return {
      azimut: azimutDeg.toFixed(4), // Redondear azimut a 4 decimales
      distancia: distancia.toFixed(4), // Redondear distancia a 4 decimales
    };
  };

  // Función que calcula y almacena azimut y distancia
  const calcularAzimutYAlmacenarValores = () => {
    const { azimut, distancia } = calcularAzimutYDistanciaDesdeCoordenadas(
      norteInicial,
      esteInicial,
      norteVisado,
      esteVisado
    );

    // Almacenar los valores calculados en el estado
    setAzimutInicial(azimut);
    setDistanciaInicial(distancia);

    setCoordenadasCalculadas(true); // Cambiar el estado para ocultar los inputs de coordenadas si corresponde
  };

  // Función para calcular la distancia vertical zenital
  const calcularDistanciaVerticalZenital = (
    grados,
    minutos,
    segundos,
    distanciaObservada
  ) => {
    // Convertimos los grados a decimales
    const anguloDecimal = convertirGMSToDecimal(grados, minutos, segundos);

    // Convertimos el ángulo a radianes
    const anguloRad = convertirGradosARadianes(anguloDecimal);

    // Calculamos la distancia vertical usando el coseno del ángulo
    const distanciaVertical = distanciaObservada * Math.cos(anguloRad);

    return distanciaVertical.toFixed(4); // Redondear a 4 decimales
  };

  const calcularAlturaObservacion = (
    alturaInicial,
    distanciaVertical,
    alturaInstrumental,
    alturaPrisma
  ) => {
    // Calcular la altura final sobre el piso
    const alturaFinal =
      parseFloat(alturaInicial) +
      parseFloat(alturaInstrumental) -
      parseFloat(alturaPrisma) +
      parseFloat(distanciaVertical);
    return alturaFinal.toFixed(4); // Redondear a 4 decimales
  };

  // Función para calcular el nuevo azimut basado en el azimut inicial y el ángulo observado
  const calcularNuevoAzimut = (azimutInicial, anguloObservadoDecimal) => {
    let nuevoAzimut = azimutInicial + anguloObservadoDecimal;

    // Si el azimut es mayor o igual a 360, restamos 360 para ajustarlo
    if (nuevoAzimut >= 360) {
      nuevoAzimut -= 360;
    }

    return nuevoAzimut.toFixed(4); // Retornamos el nuevo azimut en grados decimales
  };

  // Función para calcular y almacenar el nuevo azimut basado en la observación
  const calcularAzimutObservacion = () => {
    // Convertir ángulo observado (horizontal) a grados decimales
    const anguloHorizontalDecimal = convertirGMSToDecimal(
      gradosH,
      minutosH,
      segundosH
    );

    // Calcular el nuevo azimut basado en el ángulo observado y el azimut inicial
    const nuevoAzimutCalculado = calcularNuevoAzimut(
      parseFloat(azimutInicial),
      anguloHorizontalDecimal
    );

    // Guardar el nuevo azimut en el estado
    setNuevoAzimut(nuevoAzimutCalculado);

    return nuevoAzimutCalculado;
  };

  // Función para convertir grados a radianes
  const convertirGradosARadianes = (grados) => {
    return (grados * Math.PI) / 180;
  };

  // Función para calcular las proyecciones Norte y Este
  const calcularProyecciones = (azimut, distancia) => {
    const azimutRad = convertirGradosARadianes(azimut); // Convertir el azimut a radianes

    // Proyección Norte (coseno del azimut por la distancia)
    const proyeccionNorte = Math.cos(azimutRad) * distancia;

    // Proyección Este (seno del azimut por la distancia)
    const proyeccionEste = Math.sin(azimutRad) * distancia;

    // Retornamos las proyecciones redondeadas a 4 decimales
    return {
      norte: proyeccionNorte.toFixed(4),
      este: proyeccionEste.toFixed(4),
    };
  };

  // Función para calcular las nuevas coordenadas
  const calcularCoordenadas = (
    norteAnterior,
    esteAnterior,
    proyeccionNorte,
    proyeccionEste
  ) => {
    const nuevoNorte = parseFloat(norteAnterior) + parseFloat(proyeccionNorte);
    const nuevoEste = parseFloat(esteAnterior) + parseFloat(proyeccionEste);

    return {
      nuevoNorte: nuevoNorte.toFixed(4), // Redondear a 4 decimales
      nuevoEste: nuevoEste.toFixed(4), // Redondear a 4 decimales
    };
  };
  const [contadorObservaciones, setContadorObservaciones] = useState(0); // Contador para saber cuántas observaciones se han hecho
  // Estados para los totales
  const [totalDistancia, setTotalDistancia] = useState(0);
  const [totalProyeccionNorte, setTotalProyeccionNorte] = useState(0);
  const [totalProyeccionEste, setTotalProyeccionEste] = useState(0);

  // Estado para almacenar el último azimut calculado (usado para las siguientes observaciones)
  const [ultimoAzimut, setUltimoAzimut] = useState(null);

  const recalcularTotales = (nuevasObservaciones) => {
    // Filtrar la primera observación si el brazo es externo
    const observacionesFiltradas = brazoExterno
      ? nuevasObservaciones.slice(1)
      : nuevasObservaciones;

    calcularCierreAngular(observacionesFiltradas, sentidoPoligonal);
    calcularCierreAlturas(observacionesFiltradas, alturaInicial);

    const nuevasDistancias = observacionesFiltradas.reduce(
      (acc, obs) => acc + parseFloat(obs.distancia),
      0
    );

    const nuevasProyeccionesNorte = observacionesFiltradas.reduce(
      (acc, obs) => acc + parseFloat(obs.proyeccionNorte),
      0
    );
    const nuevasProyeccionesEste = observacionesFiltradas.reduce(
      (acc, obs) => acc + parseFloat(obs.proyeccionEste),
      0
    );

    setTotalDistancia(nuevasDistancias);
    setTotalProyeccionNorte(nuevasProyeccionesNorte);
    setTotalProyeccionEste(nuevasProyeccionesEste);

    const nuevaPrecision = calcularPrecision(
      nuevasDistancias,
      nuevasProyeccionesNorte,
      nuevasProyeccionesEste
    );
    setPrecisionPoligonal(nuevaPrecision);
  };

  const agregarNuevaObservacion = () => {
    // Validaciones
    if (
      gradosH === undefined ||
      minutosH === undefined ||
      segundosH === undefined ||
      gradosV === undefined ||
      minutosV === undefined ||
      segundosV === undefined ||
      distanciaObservada === "" ||
      isNaN(distanciaObservada)
    ) {
      alert("Por favor, completa todos los campos con valores válidos.");
      return;
    }

    // Conversión de ángulo horizontal a decimal
    const anguloObservadoDecimal = convertirGMSToDecimal(
      Number(gradosH),
      Number(minutosH),
      Number(segundosH)
    );
    let nuevoAzimutCalculado;

    if (contadorObservaciones === 0) {
      nuevoAzimutCalculado = calcularAzimutObservacion();
    } else {
      const contraAzimut = calcularContraAzimut(ultimoAzimut);
      nuevoAzimutCalculado = calcularAzimutSegundaObservacion(
        contraAzimut,
        anguloObservadoDecimal
      );
    }

    const azimutSexagesimal = convertirDecimalAGMS(nuevoAzimutCalculado);

    // Proyecciones Norte y Este
    const { norte, este } = calcularProyecciones(
      parseFloat(nuevoAzimutCalculado),
      parseFloat(distanciaObservada)
    );

    // Cálculo de nuevas coordenadas
    let nuevoNorte, nuevoEste;
    if (contadorObservaciones === 0) {
      ({ nuevoNorte, nuevoEste } = calcularCoordenadas(
        norteInicial,
        esteInicial,
        norte,
        este
      ));
    } else {
      const { nuevoNorte: norteAnterior, nuevoEste: esteAnterior } =
        observaciones[observaciones.length - 1];
      ({ nuevoNorte, nuevoEste } = calcularCoordenadas(
        norteAnterior,
        esteAnterior,
        norte,
        este
      ));
    }

    // Cálculo de la distancia vertical
    const distanciaVertical = calcularDistanciaVerticalZenital(
      gradosV,
      minutosV,
      segundosV,
      distanciaObservada
    );

    // Cálculo de la altura
    const alturaCalculada = calcularAlturaObservacion(
      contadorObservaciones === 0
        ? alturaInicial
        : observaciones[observaciones.length - 1].alturaCalculada,
      distanciaVertical,
      alturaInstrumental,
      alturaPrisma
    );

    // Crear el objeto de la nueva observación
    const nuevaObservacion = {
      id: idObservacion,
      gradosH,
      minutosH,
      segundosH,
      gradosV,
      minutosV,
      segundosV,
      azimut: azimutSexagesimal,
      anguloHorizontal: `${gradosH}° ${minutosH}' ${segundosH}"`,
      anguloVertical: `${gradosV}° ${minutosV}' ${segundosV}"`,
      distancia: distanciaObservada,
      distanciaVertical, // Añadir la distancia vertical calculada aquí
      alturaInstrumental,
      alturaPrisma,
      proyeccionNorte: norte,
      proyeccionEste: este,
      nuevoNorte,
      nuevoEste,
      alturaCalculada, // Guardar la altura calculada
      alturaCalculada1: (
        parseFloat(alturaInstrumental) +
        parseFloat(distanciaVertical) -
        parseFloat(alturaPrisma)
      ).toFixed(4),
    };

    // Actualizar observaciones y recalcular totales
    setObservaciones((prevObservaciones) => {
      const nuevasObservaciones = [...prevObservaciones, nuevaObservacion];

      // Llamamos a recalcularTotales después de agregar la nueva observación
      recalcularTotales(nuevasObservaciones);
      // Aquí calculamos el cierre de alturas con la observación recién agregada
      calcularCierreAlturas(nuevasObservaciones);

      return nuevasObservaciones;
    });

    // Actualización de totales directamente
    setTotalDistancia(
      (prevTotal) => prevTotal + parseFloat(distanciaObservada)
    );
    setTotalProyeccionNorte((prevTotal) => prevTotal + parseFloat(norte));
    setTotalProyeccionEste((prevTotal) => prevTotal + parseFloat(este));

    // Actualización de precisión
    const nuevaPrecision = calcularPrecision(
      totalDistancia + parseFloat(distanciaObservada),
      totalProyeccionNorte + parseFloat(norte),
      totalProyeccionEste + parseFloat(este)
    );
    setPrecisionPoligonal(nuevaPrecision);

    setUltimoAzimut(parseFloat(nuevoAzimutCalculado));
    setContadorObservaciones(contadorObservaciones + 1);

    // Limpiar los campos de los inputs
    setIdObservacion("");
    setGradosH("");
    setMinutosH("");
    setSegundosH("");
    setGradosV("");
    setMinutosV("");
    setSegundosV("");
    setDistanciaObservada("");
    setAlturaInstrumental("");
    setAlturaPrisma("");
  };

  // Función para calcular la precisión de la poligonal
  const calcularPrecision = (
    distanciaTotal,
    proyeccionNorteTotal,
    proyeccionEsteTotal
  ) => {
    const sumatoriaProyecciones = Math.sqrt(
      Math.pow(proyeccionNorteTotal, 2) + Math.pow(proyeccionEsteTotal, 2)
    );
    const precision = distanciaTotal / sumatoriaProyecciones;
    return precision.toFixed(4); // Redondeamos a 4 decimales
  };

  const calcularContraAzimut = (azimut) => {
    let contraAzimut;

    if (azimut < 180) {
      contraAzimut = azimut + 180;
    } else {
      contraAzimut = azimut - 180;
    }

    // Aseguramos que el contra-azimut esté en el rango de 0 a 360 grados
    if (contraAzimut >= 360) {
      contraAzimut -= 360;
    }

    return contraAzimut.toFixed(4); // Retornamos el contra-azimut redondeado a 4 decimales
  };

  const calcularAzimutSegundaObservacion = (
    contraAzimut,
    anguloObservadoDecimal
  ) => {
    let nuevoAzimut =
      parseFloat(contraAzimut) + parseFloat(anguloObservadoDecimal);

    // Si el nuevo azimut es mayor o igual a 360, restamos 360
    if (nuevoAzimut >= 360) {
      nuevoAzimut -= 360;
    }

    return nuevoAzimut.toFixed(4); // Retornamos el nuevo azimut redondeado a 4 decimales
  };

  const borrarUltimaObservacion = () => {
    if (observaciones.length > 0) {
      const ultimaObservacion = observaciones[observaciones.length - 1];

      // Restar la distancia y proyecciones de la última observación
      setTotalDistancia((prevTotal) =>
        Math.max(0, prevTotal - parseFloat(ultimaObservacion.distancia))
      );
      setTotalProyeccionNorte((prevTotal) =>
        Math.max(0, prevTotal - parseFloat(ultimaObservacion.proyeccionNorte))
      );
      setTotalProyeccionEste((prevTotal) =>
        Math.max(0, prevTotal - parseFloat(ultimaObservacion.proyeccionEste))
      );

      // Crear una nueva lista sin la última observación
      const nuevasObservaciones = observaciones.slice(0, -1);
      setObservaciones(nuevasObservaciones);

      // Recalcular la precisión de la poligonal
      const nuevaPrecision = calcularPrecision(
        Math.max(0, totalDistancia - parseFloat(ultimaObservacion.distancia)),
        Math.max(
          0,
          totalProyeccionNorte - parseFloat(ultimaObservacion.proyeccionNorte)
        ),
        Math.max(
          0,
          totalProyeccionEste - parseFloat(ultimaObservacion.proyeccionEste)
        )
      );
      setPrecisionPoligonal(nuevaPrecision);

      // Actualizar el contador de observaciones
      setContadorObservaciones(contadorObservaciones - 1);

      // Si todavía hay observaciones, actualiza el último azimut
      if (nuevasObservaciones.length > 0) {
        const ultimoAzimutAnterior =
          nuevasObservaciones[nuevasObservaciones.length - 1].azimut;
        const ultimoAzimutDecimal = convertirGMSToDecimal(
          ...ultimoAzimutAnterior.split(/[°'"]/).map((num) => parseFloat(num))
        );
        setUltimoAzimut(ultimoAzimutDecimal);
      } else {
        setUltimoAzimut(null);
      }

      // --- Recalcular el cierre angular ---
      // Actualizamos el resumen angular de la poligonal después de eliminar la observación
      calcularCierreAngular(nuevasObservaciones, sentidoPoligonal);
    }
  };

  const compensarAngular = () => {
    const N = observaciones.length;

    // Evitar divisiones por cero si no hay observaciones
    if (N === 0) return [];

    // Si es brazo externo, omitimos el primer ángulo para la compensación
    const observacionesACompensar = brazoExterno
      ? observaciones.slice(1)
      : observaciones;
    const cantidadObservaciones = observacionesACompensar.length;

    // Ajuste angular basado en la cantidad de ángulos a compensar (si brazo externo, N-1)
    const ajusteAngular =
      convertirAGradosDecimales(
        errorAngular.grados,
        errorAngular.minutos,
        errorAngular.segundos
      ) / cantidadObservaciones; // Ajuste en grados decimales basado en la cantidad de observaciones a compensar

    // Crear un nuevo array de observaciones compensadas
    const nuevasObservaciones = observaciones.map((obs, index) => {
      // Si es la primera observación y el brazo es externo, devolverla sin cambios (mantener el ángulo tal cual)
      if (index === 0 && brazoExterno) {
        return {
          ...obs,
          anguloHorizontalCompensado: obs.anguloHorizontal, // Mantener el ángulo original
        };
      }

      // Convertir el ángulo horizontal actual a decimal
      const [grados, minutos, segundos] = obs.anguloHorizontal
        .split(/[°'"]/)
        .map(parseFloat);

      const anguloDec = convertirAGradosDecimales(grados, minutos, segundos);

      // Aplicar el ajuste en grados decimales
      const anguloCompensadoDec = anguloDec - ajusteAngular;

      // Convertir de nuevo a GMS
      const anguloCompensadoGMS = convertirDecimalAGMS(anguloCompensadoDec);

      // Retornar la observación con el ángulo compensado
      return {
        ...obs,
        anguloHorizontalCompensado: anguloCompensadoGMS, // Guardamos el ángulo compensado en GMS
      };
    });

    return nuevasObservaciones; // Devolver las observaciones ajustadas
  };
  const ajustarAlturasVerticales = (observacionesCompensadas) => {
    let alturaAcumulada;

    // Usar la altura real de la primera observación como base si el brazo es externo
    if (brazoExterno) {
      alturaAcumulada = parseFloat(observacionesCompensadas[0].alturaCalculada);
      console.log(
        `\n*** Brazo Externo: Usando altura de la primera observación como base: ${alturaAcumulada} ***`
      );
    } else {
      // Si es brazo interno, partimos de la altura real calculada en la primera observación
      alturaAcumulada = parseFloat(observacionesCompensadas[0].alturaCalculada);
      console.log(
        `\n*** Brazo Interno: Usando altura inicial de la primera observación: ${alturaAcumulada} ***`
      );
    }

    // Validar que la altura base sea válida
    if (isNaN(alturaAcumulada)) {
      console.error("Error: Altura inicial no válida.");
      alturaAcumulada = 0; // Manejo de error básico
    }

    // Ajustar las alturas progresivamente
    const nuevasObservaciones = observacionesCompensadas.map((obs, index) => {
      console.log(
        `\nCalculando altura compensada para la observación ${obs.id}`
      );

      if (index === 0 && brazoExterno) {
        // La primera observación no se ajusta si el brazo es externo
        obs.alturaCompensada = obs.alturaCalculada;
        console.log(
          `Brazo Externo - Primera observación sin ajuste: ${obs.alturaCompensada}`
        );
      } else {
        // Validar la distancia vertical compensada
        const distanciaVerticalCompensada = parseFloat(
          obs.distanciaVerticalCompensada
        );
        if (isNaN(distanciaVerticalCompensada)) {
          console.error(
            `Error: La distancia vertical compensada no es válida para la observación ${obs.id}`
          );
          obs.alturaCompensada = "NaN"; // Manejo de error
        } else {
          // Calcular la nueva altura acumulada
          alturaAcumulada += distanciaVerticalCompensada;

          obs.alturaCompensada = alturaAcumulada.toFixed(4);
          console.log(
            `Altura acumulada y compensada para la observación ${obs.id}: ${obs.alturaCompensada}`
          );
        }
      }

      return obs;
    });

    return nuevasObservaciones;
  };

  const compensarProyeccionesYAlturas = (
    nuevasObservaciones,
    alturaInicial
  ) => {
    const errorNorte = totalProyeccionNorte; // Error en la proyección Norte
    const errorEste = totalProyeccionEste; // Error en la proyección Este
    const errorAlturas = cierreAlturas; // Error de cierre en alturas

    // Filtrar la primera observación si el brazo es externo
    const observacionesACompensar = brazoExterno
      ? nuevasObservaciones.slice(1)
      : nuevasObservaciones;

    // Calcular el total de distancia solo de las observaciones que se van a compensar
    const totalDistancia = observacionesACompensar.reduce(
      (total, obs) => total + parseFloat(obs.distancia),
      0
    );

    // Compensar las distancias verticales antes de ajustar las alturas
    const observacionesConDistanciaCompensada = nuevasObservaciones.map(
      (obs, index) => {
        if (index === 0) {
          return obs; // No compensar la primera observación si es brazo externo
        }

        // Calcular el ajuste de altura basado en la distancia
        const ajusteAltura =
          (Math.abs(errorAlturas) * obs.distancia) / totalDistancia;

        // Validar la distancia vertical original
        const distanciaVertical = parseFloat(obs.alturaCalculada1);
        console.log(
          `Distancia Vertical Original para observación ${obs.id}: ${distanciaVertical}`
        );

        if (isNaN(distanciaVertical)) {
          console.error("Error: distanciaVertical no es un número válido", obs);
          obs.distanciaVerticalCompensada = "NaN";
        } else {
          // Ajustar según el signo del errorAlturas
          const distanciaVerticalCompensada =
            errorAlturas < 0
              ? distanciaVertical + ajusteAltura // Sumar si errorAlturas es negativo
              : distanciaVertical - ajusteAltura; // Restar si errorAlturas es positivo

          console.log(
            `Distancia Vertical Compensada para observación ${obs.id}: ${distanciaVerticalCompensada}`
          );
          obs.distanciaVerticalCompensada =
            distanciaVerticalCompensada.toFixed(4); // Guardar la distancia vertical compensada
        }

        return obs;
      }
    );

    // *** Ajustar las alturas verticales con la distancia compensada ***
    const observacionesConAlturasAjustadas = ajustarAlturasVerticales(
      observacionesConDistanciaCompensada,
      alturaInicial
    );

    // Compensar proyecciones Norte y Este, además de ajustar las alturas calculadas
    const observacionesFinales = observacionesConAlturasAjustadas.map(
      (obs, index) => {
        if (index === 0 && brazoExterno) {
          // Si es la primera observación y el brazo es externo, no se ajusta pero se mantiene en la tabla
          return {
            ...obs,
            proyeccionNorteCompensada: obs.proyeccionNorte,
            proyeccionEsteCompensada: obs.proyeccionEste,
            alturaCompensada: obs.alturaCompensada, // Mantener la altura calculada
          };
        }

        // Aplicar ajustes a las proyecciones para el resto de las observaciones
        const ajusteNorte = (errorNorte * obs.distancia) / totalDistancia;
        const ajusteEste = (errorEste * obs.distancia) / totalDistancia;

        const proyeccionNorteCompensada =
          parseFloat(obs.proyeccionNorte) - ajusteNorte;
        const proyeccionEsteCompensada =
          parseFloat(obs.proyeccionEste) - ajusteEste;

        return {
          ...obs,
          proyeccionNorteCompensada: proyeccionNorteCompensada.toFixed(4),
          proyeccionEsteCompensada: proyeccionEsteCompensada.toFixed(4),
          alturaCompensada: obs.alturaCompensada, // Mantener la altura compensada calculada
        };
      }
    );

    return observacionesFinales; // Retornar las observaciones compensadas con proyecciones y alturas ajustadas
  };

  const compensarPoligonal = () => {
    const nuevasObservaciones = compensarAngular(); // Primero ajusta los ángulos

    // Llama a la función de compensar proyecciones y alturas, incluyendo la altura inicial
    const observacionesFinales = compensarProyeccionesYAlturas(
      nuevasObservaciones,
      alturaInicial // Asegúrate de que alturaInicial esté definida en tu estado o variable
    );

    setObservacionesCompensadas(observacionesFinales); // Actualizar el estado con las observaciones compensadas
  };

  // Función para recalcular las coordenadas con las proyecciones ajustadas
  const recalcularCoordenadasAjustadas = (
    norteAnterior,
    esteAnterior,
    proyeccionNorteAjustada,
    proyeccionEsteAjustada
  ) => {
    const nuevoNorteAjustado =
      parseFloat(norteAnterior) + parseFloat(proyeccionNorteAjustada);
    const nuevoEsteAjustado =
      parseFloat(esteAnterior) + parseFloat(proyeccionEsteAjustada);

    return {
      nuevoNorteAjustado: nuevoNorteAjustado.toFixed(4),
      nuevoEsteAjustado: nuevoEsteAjustado.toFixed(4),
    };
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="formulario-observacion"
    >
      {!coordenadasCalculadas ? (
        <>
          {" "}
          <div>
            <label>Sentido de la Poligonal: </label>
            <select
              value={sentidoPoligonal}
              onChange={(e) => setSentidoPoligonal(e.target.value)}
            >
              <option value="internos">Ángulos Internos</option>
              <option value="externos">Ángulos Externos</option>
            </select>
          </div>
          <div>
            <label>Tipo de Brazo de la Poligonal: </label>
            <select
              value={brazoExterno ? "externo" : "interno"} // Determinar si el brazo es externo o interno
              onChange={(e) => setBrazoExterno(e.target.value === "externo")}
            >
              <option value="interno">Brazo Interno</option>{" "}
              {/* Opción para poligonal interna */}
              <option value="externo">Brazo Externo</option>{" "}
              {/* Opción para poligonal con brazo externo */}
            </select>
          </div>
          <h3>Coordenadas del Punto Inicial (D1)</h3>
          <input
            type="text"
            placeholder="Norte (Y)"
            value={norteInicial}
            onChange={(e) => setNorteInicial(e.target.value)}
            required
            className="coordenadas-input"
          />
          <input
            type="text"
            placeholder="Este (X)"
            value={esteInicial}
            onChange={(e) => setEsteInicial(e.target.value)}
            required
            clas
            sName="coordenadas-input"
          />
          {/* Nuevo input para la altura inicial */}
          <input
            type="number"
            placeholder="Altura (m)"
            value={alturaInicial}
            onChange={(e) => setAlturaInicial(e.target.value)} // Actualizar el estado de la altura inicial
            required
            className="coordenadas-input"
          />
          <h3>Coordenadas del Punto Visado (D2)</h3>
          <input
            type="text"
            placeholder="Norte (Y)"
            value={norteVisado}
            onChange={(e) => setNorteVisado(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Este (X)"
            value={esteVisado}
            onChange={(e) => setEsteVisado(e.target.value)}
            required
          />
          <button type="button" onClick={calcularAzimutYAlmacenarValores}>
            Calcular Azimut y Distancia
          </button>
        </>
      ) : (
        <>
          <h3 style={{ margin: "5px 0" }}>
            Azimut Inicial: {convertirDecimalAGMS(azimutInicial)}
          </h3>
          <h3 style={{ margin: "5px 0" }}>
            Distancia Inicial: {distanciaInicial} metros
          </h3>
          <h3 style={{ margin: "5px 0" }}>Ingresar Observación</h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100px",
              }}
            >
              <h4>
                ID
                <br />
                Obs
              </h4>
              <input
                type="text"
                placeholder="ID"
                value={idObservacion}
                onChange={(e) => setIdObservacion(e.target.value)}
                required
                style={{
                  width: "80px", // Ancho del input
                  textAlign: "center", // Texto centrado dentro del input
                  display: "block", // Asegura que el input ocupe todo el ancho del contenedor
                  margin: "0 auto", // Centra el input dentro del contenedor
                }}
              />
            </div>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "150px",
              }}
            >
              <h4>
                Ángulo
                <br />
                Horizontal
              </h4>
              <input
                type="number"
                placeholder="Grados"
                value={gradosH}
                onChange={(e) => setGradosH(Number(e.target.value))} // Asegurarse de convertir a número
                required
                style={{
                  width: "60px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <input
                type="number"
                placeholder="Minutos"
                value={minutosH}
                onChange={(e) => setMinutosH(Number(e.target.value))} // Convertir a número
                required
                style={{
                  width: "60px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <input
                type="number"
                placeholder="Segundos"
                value={segundosH}
                onChange={(e) => setSegundosH(Number(e.target.value))} // Convertir a número
                required
                style={{
                  width: "60px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "150px",
              }}
            >
              <h4>
                Ángulo
                <br />
                Vertical
              </h4>
              <input
                type="number"
                placeholder="Grados"
                value={gradosV}
                onChange={(e) => setGradosV(e.target.value)}
                required
                style={{
                  width: "60px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <input
                type="number"
                placeholder="Minutos"
                value={minutosV}
                onChange={(e) => setMinutosV(e.target.value)}
                required
                style={{
                  width: "60px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <input
                type="number"
                placeholder="Segundos"
                value={segundosV}
                onChange={(e) => setSegundosV(e.target.value)}
                required
                style={{
                  width: "60px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100px",
              }}
            >
              <h4>
                Distancia
                <br />
                (Metros)
              </h4>
              <input
                type="number"
                placeholder="Distancia (m)"
                value={distanciaObservada}
                onChange={(e) => setDistanciaObservada(e.target.value)}
                required
                style={{
                  width: "80px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
              }}
            >
              <h4>
                Altura
                <br />
                Instrumental
              </h4>
              <input
                type="number"
                placeholder="Altura Instrumental (m)"
                value={alturaInstrumental}
                onChange={(e) => setAlturaInstrumental(e.target.value)}
                required
                style={{
                  width: "80px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
              }}
            >
              <h4>
                Altura
                <br />
                Prisma
              </h4>
              <input
                type="number"
                placeholder="Altura Prisma (m)"
                value={alturaPrisma}
                onChange={(e) => setAlturaPrisma(e.target.value)}
                required
                style={{
                  width: "80px",
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>

          <button type="button" onClick={agregarNuevaObservacion}>
            Agregar Observación
          </button>

          {/* Mostrar el nuevo azimut calculado si está disponible */}
          {nuevoAzimut && (
            <h3>Nuevo Azimut: {convertirDecimalAGMS(nuevoAzimut)}</h3>
          )}

          {/* Tabla de observaciones */}
          {observaciones.length > 0 && (
            <>
              <table border="1" cellPadding="10" cellSpacing="1">
                <thead>
                  <tr>
                    <th className="id">ID</th>
                    <th className="angulo">Ángulo Horizontal</th>
                    <th className="angulo">Ángulo Vertical</th>
                    <th className="distancia">Distancia</th>
                    <th className="angulo">Azimut</th>
                    <th className="altura">Altura Ins (m)</th>
                    <th className="altura">Altura Pri (m)</th>
                    <th className="proyeccion">Proyección Norte</th>
                    <th className="proyeccion">Proyección Este</th>
                    <th className="coordenada">Norte</th>
                    <th className="coordenada">Este</th>
                    <th className="altura">Altura </th>{" "}
                    {/* Nueva columna para la altura calculada */}
                  </tr>
                </thead>
                <tbody>
                  {observaciones.map((obs, index) => {
                    // Calcular la distancia vertical zenital
                    const distanciaVertical = calcularDistanciaVerticalZenital(
                      obs.gradosV,
                      obs.minutosV,
                      obs.segundosV,
                      obs.distancia
                    );

                    // Calcular la altura ajustada sobre el piso
                    const alturaCalculada = calcularAlturaObservacion(
                      index === 0
                        ? alturaInicial
                        : observaciones[index - 1].alturaCalculada, // Usamos la altura inicial para la primera observación, y luego la altura calculada anterior
                      distanciaVertical,
                      obs.alturaInstrumental,
                      obs.alturaPrisma
                    );

                    // Guardar la altura calculada en el objeto de observación
                    observaciones[index].alturaCalculada = alturaCalculada;

                    return (
                      <tr key={index}>
                        <td>{obs.id}</td>
                        <td>{obs.anguloHorizontal}</td>
                        <td>{obs.anguloVertical}</td>
                        <td>{obs.distancia} m</td>
                        <td>{obs.azimut}</td>
                        <td>{obs.alturaInstrumental} m</td>
                        <td>{obs.alturaPrisma} m</td>
                        <td>{obs.proyeccionNorte} m</td>
                        <td>{obs.proyeccionEste} m</td>
                        <td>{obs.nuevoNorte}</td>
                        <td>{obs.nuevoEste}</td>
                        <td>{alturaCalculada} </td>{" "}
                        {/* Mostrar la altura calculada */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Botón para borrar la última observación */}
              <button type="button" onClick={borrarUltimaObservacion}>
                Borrar Última Observación
              </button>
              <>
                {/* Resumen Angular de la Poligonal */}
                <div className="resumen-angular">
                  <h3>Resumen Angular de la Poligonal</h3>
                  <p>
                    <strong>Suma Teórica:</strong>{" "}
                    {`${sumaTeorica.grados}° ${sumaTeorica.minutos}' ${sumaTeorica.segundos}"`}
                  </p>
                  <p>
                    <strong>Suma Real:</strong>{" "}
                    {`${sumaReal.grados}° ${sumaReal.minutos}' ${sumaReal.segundos}"`}
                  </p>
                  <p>
                    <strong>Error Angular:</strong>{" "}
                    {`${errorAngular.grados}° ${errorAngular.minutos}' ${errorAngular.segundos}"`}
                  </p>
                </div>

                {/* Totales */}
                <div className="totales">
                  <h3>Totales</h3>
                  <p>
                    <strong>Total Distancia:</strong>{" "}
                    {totalDistancia.toFixed(4)} m
                  </p>
                  <p>
                    <strong>Total Proyección Norte:</strong>{" "}
                    {totalProyeccionNorte.toFixed(4)} m
                  </p>
                  <p>
                    <strong>Total Proyección Este:</strong>{" "}
                    {totalProyeccionEste.toFixed(4)} m
                  </p>
                  <p>
                    <strong>Cierre Alturas:</strong> {cierreAlturas} m
                  </p>
                </div>

                {/* Precisión de la Poligonal */}
                <div className="precision-poligonal">
                  <h3>Precisión de la Poligonal</h3>
                  <p>
                    <strong>Precisión:</strong> {precisionPoligonal}
                  </p>
                </div>
              </>
            </>
          )}
          {/* Botón para compensar la poligonal */}
          <button type="button" onClick={compensarPoligonal}>
            Compensar Poligonal
          </button>

          {/* Tabla de observaciones compensadas */}
          {observacionesCompensadas.length > 0 && (
            <>
              <h3>Observaciones Compensadas</h3>
              <table border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ángulo Horizontal Compensado</th>
                    <th>Proyección Norte Compensada</th>
                    <th>Proyección Este Compensada</th>
                    <th>Norte Ajustado</th>
                    <th>Este Ajustado</th>
                    <th>Altura Compensada</th>{" "}
                    {/* Asegúrate de tener esta columna */}
                  </tr>
                </thead>
                <tbody>
                  {observacionesCompensadas.map((obs, index) => {
                    // Recalcular las coordenadas ajustadas con las proyecciones compensadas
                    const { nuevoNorteAjustado, nuevoEsteAjustado } =
                      recalcularCoordenadasAjustadas(
                        index === 0
                          ? norteInicial // Para la primera observación usamos la coordenada inicial
                          : observacionesCompensadas[index - 1]
                              .nuevoNorteAjustado, // Para las demás usamos la coordenada ajustada anterior
                        index === 0
                          ? esteInicial
                          : observacionesCompensadas[index - 1]
                              .nuevoEsteAjustado, // Coordenada Este ajustada anterior
                        obs.proyeccionNorteCompensada,
                        obs.proyeccionEsteCompensada
                      );

                    // Actualizamos las coordenadas ajustadas en el objeto de observación compensada
                    observacionesCompensadas[index].nuevoNorteAjustado =
                      nuevoNorteAjustado;
                    observacionesCompensadas[index].nuevoEsteAjustado =
                      nuevoEsteAjustado;

                    return (
                      <tr key={index}>
                        <td>{obs.id}</td>
                        <td>{obs.anguloHorizontalCompensado}</td>
                        <td>{obs.proyeccionNorteCompensada} m</td>
                        <td>{obs.proyeccionEsteCompensada} m</td>
                        <td>{nuevoNorteAjustado}</td>
                        <td>{nuevoEsteAjustado}</td>
                        <td>
                          {isNaN(parseFloat(obs.alturaCompensada))
                            ? "-"
                            : parseFloat(obs.alturaCompensada).toFixed(3)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Añadir el gráfico aquí */}

              <GraficoPoligonalSVG
                observacionesCompensadas={observacionesCompensadas}
              />
            </>
          )}
        </>
      )}
    </form>
  );
};

export default FormularioObservacion;
