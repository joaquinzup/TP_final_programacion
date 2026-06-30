const armas = [
  { nombre: "CAMRS",    tipo: "DMR",       operador: "Buck",             dificultad: "Media" },
  { nombre: "417",      tipo: "DMR",       operador: "Twitch / Lion / Sens", dificultad: "Media" },
  { nombre: "AR-15.50", tipo: "DMR",       operador: "Maverick",         dificultad: "Alta"  },
  { nombre: "PMR90A2",  tipo: "DMR",       operador: "Varios",           dificultad: "Media" },
  { nombre: "LMG-E",    tipo: "LMG",       operador: "Zofia / Ram",      dificultad: "Alta"  },
  { nombre: "Alda 5.56",tipo: "LMG",       operador: "Maestro",          dificultad: "Alta"  },
  { nombre: "6P41",     tipo: "LMG",       operador: "Finka / Fuze",     dificultad: "Media" },
  { nombre: "DP27",     tipo: "LMG",       operador: "Tachanka",         dificultad: "Baja"  },
  { nombre: "M590A1",   tipo: "Escopeta",  operador: "SAS",              dificultad: "Baja"  },
  { nombre: "M1014",    tipo: "Escopeta",  operador: "FBI",              dificultad: "Baja"  },
  { nombre: "BOSG.12.2",tipo: "Escopeta",  operador: "Varios",           dificultad: "Muy Alta"},
  { nombre: "SMG-11",   tipo: "SMG",       operador: "Smoke / Sledge",   dificultad: "Muy Alta"},
  { nombre: "SMG-12",   tipo: "SMG",       operador: "Dokkaebi / Vigil / Ying", dificultad: "Muy Alta"},
  { nombre: "MP5",      tipo: "SMG",       operador: "Melusi / Doc",     dificultad: "Baja"  },
  { nombre: "P226 Mk 25",tipo: "Pistola",  operador: "Varios",           dificultad: "Baja"  },
  { nombre: "5.7 USG",  tipo: "Pistola",   operador: "Varios",           dificultad: "Baja"  },
];
function mostrarResultados(lista) {
  const contenedor = document.getElementById("resultados-busqueda");
  if (!contenedor) return;

contenedor.innerHTML = "";

  if (lista.length === 0) {
    const msg = document.createElement("p");
    msg.className = "sin-resultados";
    msg.textContent = "No se encontraron armas con ese criterio.";
    contenedor.appendChild(msg);
    return;
  }
  lista.forEach(function (arma) {
    const card = document.createElement("div");
    card.className = "arma-card";
    card.innerHTML = `
      <strong>${arma.nombre}</strong>
      <span class="tag tipo">${arma.tipo}</span>
      <p>Operador: ${arma.operador}</p>
      <p>Dificultad: <em>${arma.dificultad}</em></p>
    `;
    contenedor.appendChild(card);
  });
}

function filtrarArmas(termino, tipo) {
  return armas.filter(function (arma) {
    const coincideTexto = arma.nombre.toLowerCase().includes(termino.toLowerCase()) ||
                          arma.operador.toLowerCase().includes(termino.toLowerCase());
    const coincideTipo  = tipo === "todos" || arma.tipo === tipo;
    return coincideTexto && coincideTipo;
  });
}

function validarFormulario(event) {
  event.preventDefault();
  limpiarErrores();

  try {
    const nombre   = document.getElementById("nombre");
    const nametag  = document.getElementById("nametag");
    const compe    = document.querySelector('input[name="compe"]:checked');
    const comentario = document.getElementById("comentario");

    let hayError = false;

    if (!nombre || nombre.value.trim() === "") {
      mostrarError("error-nombre", "El nombre es obligatorio.");
      hayError = true;
    }

    if (!nametag || nametag.value.trim() === "") {
      mostrarError("error-nametag", "El NameTag es obligatorio.");
      hayError = true;
    }

    if (!compe) {
      mostrarError("error-compe", "Seleccioná si jugás competitivas.");
      hayError = true;
    }

    if (hayError) {
      throw new Error("Formulario incompleto");
    }

     mostrarExito();
    event.target.reset();

    } catch (error) {
    console.warn("Error de validación:", error.message);
  }
}