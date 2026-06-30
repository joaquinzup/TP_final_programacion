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

function mostrarError(idElemento, mensaje) {
  const el = document.getElementById(idElemento);
  if (el) {
    el.textContent = mensaje;
    el.style.display = "block";
  }
}

function limpiarErrores() {
  const errores = document.querySelectorAll(".error-msg");
  errores.forEach(function (e) {
    e.textContent = "";
    e.style.display = "none";
  });

  const exito = document.getElementById("exito-msg");
  if (exito) exito.style.display = "none";
}

function mostrarExito() {
  const exito = document.getElementById("exito-msg");
  if (exito) {
    exito.textContent = "¡Gracias por tu opinión! Fue enviada correctamente.";
    exito.style.display = "block";
  }
}

function agregarTooltipsRangos() {
  const descripciones = {
    "Cobre":    "Rango inicial. Se consigue simplemente jugando.",
    "Bronce":   "Jugadores con algo de experiencia táctica.",
    "Plata":    "Buen conocimiento del juego y los operadores.",
    "Oro":      "Comunicación y coordinación ya son clave.",
    "Platino":  "Jugadores altamente competitivos.",
    "Diamante": "Élite del juego. Mecánicas muy refinadas.",
    "Campeón":  "Top 5000 jugadores del servidor. Nivel pro.",
  };

  const celdas = document.querySelectorAll("table th p, table td");
  celdas.forEach(function (celda) {
    const texto = celda.textContent.trim();
    if (descripciones[texto]) {
      celda.setAttribute("title", descripciones[texto]);
      celda.style.cursor = "help";
    }
  });
}

function toggleTema() {
  const body   = document.body;
  const btn    = document.getElementById("btn-tema");
  const claro  = body.classList.toggle("tema-claro");

  localStorage.setItem("tema", claro ? "claro" : "oscuro");

  if (btn) {
    btn.querySelector(".icono-tema").textContent = claro ? "☀️" : "🌙";
    btn.querySelector(".label-tema").textContent  = claro ? "Claro" : "Oscuro";
  }
}

function aplicarTemaGuardado() {
  const temaGuardado = localStorage.getItem("tema");
  const btn = document.getElementById("btn-tema");

  if (temaGuardado === "claro") {
    document.body.classList.add("tema-claro");
    if (btn) {
      btn.querySelector(".icono-tema").textContent = "☀️";
      btn.querySelector(".label-tema").textContent  = "Claro";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {

  aplicarTemaGuardado();

  const btnTema = document.getElementById("btn-tema");
  if (btnTema) {
    btnTema.addEventListener("click", toggleTema);
  }

  const inputBusqueda = document.getElementById("input-busqueda");
  const filtroPorTipo  = document.getElementById("filtro-tipo");

  if (inputBusqueda && filtroPorTipo) {
    mostrarResultados(armas);

    inputBusqueda.addEventListener("input", function () {
      const resultados = filtrarArmas(this.value, filtroPorTipo.value);
      mostrarResultados(resultados);
    });

    filtroPorTipo.addEventListener("change", function () {
      const resultados = filtrarArmas(inputBusqueda.value, this.value);
      mostrarResultados(resultados);
    });
  }

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(function (link) {
    link.addEventListener("mouseover", function () {
      this.style.opacity = "0.75";
    });
    link.addEventListener("mouseout", function () {
      this.style.opacity = "1";
    });
  });

  agregarTooltipsRangos();

  const formulario = document.querySelector("form");
  if (formulario) {
    formulario.addEventListener("submit", validarFormulario);
    const nombre = document.getElementById("nombre");
    if (nombre) {
      nombre.addEventListener("keyup", function () {
        const errorEl = document.getElementById("error-nombre");
        if (errorEl && this.value.trim() !== "") {
          errorEl.style.display = "none";
        }
      });
    }
  }
});