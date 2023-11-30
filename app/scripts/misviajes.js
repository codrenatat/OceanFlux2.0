function showMisViajes(viajes = []) {
  const tablaViajes = document.getElementById("tablaViajes");

  tablaViajes.innerHTML = "";

  let totalGeneral = 0;

  viajes.forEach((viaje) => {
    let total = Number(viaje.numNoches || 1) * Number(viaje.total) * Number(viaje.numPersonas || 1);
    totalGeneral += total;

    const fila = document.createElement("tr");

    const idViaje = document.createElement("td");
    idViaje.textContent = viaje._id;
    fila.appendChild(idViaje);

    const playa = document.createElement("td");
    playa.textContent = viaje.playa;
    fila.appendChild(playa);

    const hotel = document.createElement("td");
    hotel.textContent = viaje.hotel;
    fila.appendChild(hotel);

    const precioxnoche = document.createElement("td");
    precioxnoche.className = "precioxnoche";
    precioxnoche.textContent = viaje.total;
    fila.appendChild(precioxnoche);

    const numNoches = document.createElement("td");
    const numNochesInput = document.createElement("input");
    numNochesInput.type = "number";
    numNochesInput.min = "1";
    numNochesInput.className = "form-control numNoches";
    numNochesInput.value = viaje.numNoches || 1;
    numNochesInput.addEventListener("input", recalculateTotal);
    numNoches.appendChild(numNochesInput);
    fila.appendChild(numNoches);

    const numPersonas = document.createElement("td");
    const numPersonasInput = document.createElement("input");
    numPersonasInput.type = "number";
    numPersonasInput.min = "1";
    numPersonasInput.className = "form-control numPersonas";
    numPersonasInput.value = viaje.numPersonas || 1;
    numPersonasInput.addEventListener("input", recalculateTotal);
    numPersonas.appendChild(numPersonasInput);
    fila.appendChild(numPersonas);

    const totalEl = document.createElement("td");
    totalEl.className = "total";
    totalEl.textContent = total;
    fila.appendChild(totalEl);

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.className = "btn btn-danger";
    eliminarBtn.addEventListener("click", () => eliminarViaje(viaje._id, total, viaje.hotelId));
    const eliminarTd = document.createElement("td");
    eliminarTd.appendChild(eliminarBtn);
    fila.appendChild(eliminarTd);

    fila.setAttribute("data-id", viaje._id);

    tablaViajes.appendChild(fila);
  });

  const totalFila = document.createElement("tr");
  totalFila.innerHTML = `
    <td colspan="3"></td>
    <td class="totalLabel">Total</td>
    <td id="totalViajes" class="total" colspan="3">${totalGeneral}</td>
    <td></td>
  `;
  tablaViajes.appendChild(totalFila);
}

function recalculateTotal() {
  let totalGeneral = 0;
  const filas = document.querySelectorAll("#tablaViajes tr:not(:last-child)");

  filas.forEach((fila) => {
    const numNoches = Number(fila.querySelector(".numNoches").value);
    const numPersonas = Number(fila.querySelector(".numPersonas").value);
    const precioxnoche = Number(fila.querySelector(".precioxnoche").textContent);
    const total = numNoches * precioxnoche * numPersonas;
    fila.querySelector(".total").textContent = total;
    totalGeneral += total;
  });

  document.getElementById("totalViajes").textContent = totalGeneral;
}

function eliminarViaje(idViaje, total, hotelId) {
  const filaAEliminar = document.querySelector(`#tablaViajes tr[data-id="${idViaje}"]`);
  
  fetch(`http://localhost:3000/viajes/${idViaje}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Viaje eliminado:", data);
      
      filaAEliminar.remove();
      recalculateTotal();
      guardarViajesEnAlmacenamientoLocal();
    })
    .catch((error) => {
      console.error("Error al eliminar el viaje:", error);
    });
}

function guardarViajesEnAlmacenamientoLocal() {
  const filas = document.querySelectorAll("#tablaViajes tr[data-id]");
  const viajes = [];

  filas.forEach((fila) => {
    const idViaje = fila.getAttribute("data-id");
    const playa = fila.querySelector("td:nth-child(2)").textContent;
    const hotel = fila.querySelector("td:nth-child(3)").textContent;
    const precioxnoche = fila.querySelector(".precioxnoche").textContent;
    const numNoches = fila.querySelector(".numNoches input").value;
    const numPersonas = fila.querySelector(".numPersonas input").value;
    const total = fila.querySelector(".total").textContent;

    viajes.push({
      _id: idViaje,
      playa: playa,
      hotel: hotel,
      total: precioxnoche,
      numNoches: numNoches,
      numPersonas: numPersonas,
      
      total: total,
    });
  });

  localStorage.setItem("viajes", JSON.stringify(viajes));
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerYMostrarMisViajes();
});

async function obtenerYMostrarMisViajes() {
  try {
    const usuarioId = "usuario123";

    const response = await fetch(`http://localhost:3000/viajes?usuario=${usuarioId}`);
    const viajes = await response.json();
    showMisViajes(viajes);
  } catch (error) {
    console.error("Error al obtener mis viajes:", error);
  }
}

