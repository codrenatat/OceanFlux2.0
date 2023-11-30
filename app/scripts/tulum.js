const showAlert = (type, message) => {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", `alert--${type}`);
  alertDiv.innerHTML = `
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
      <strong>${type === "success" ? "Bien" : "Oops"}</strong> ${message}
  `;

  // Cambiado para agregar la alerta al contenedor de hoteles
  const contenedorHoteles = document.getElementById("contenedor-hoteles");
  contenedorHoteles.appendChild(alertDiv);
};

(async () => {
    const contenedorHoteles = document.getElementById("contenedor-hoteles");
    contenedorHoteles.innerHTML = "";
  
    try {
      const res = await fetch("http://localhost:3000/hotels/Tulum");
      const hotelsData = await res.json();
  
      if (hotelsData.length === 0) {
        const container = document.createElement("div");
        container.classList.add("error");
        container.innerHTML = "No hotels to show";
        contenedorHoteles.appendChild(container);
        return;
      }
  
      const container = document.createElement("div");
      container.classList.add("container");
      contenedorHoteles.appendChild(container);
  
      const row = document.createElement("div");
      row.classList.add("row");
      container.appendChild(row);
  
      hotelsData.forEach((hotelData, index) => {
        const col = document.createElement("div");
        col.classList.add("col-md-6");
        row.appendChild(col);
  
        const cardHotel = document.createElement("div");
        cardHotel.classList.add("card2");
        col.appendChild(cardHotel);
  
        const cardContent = document.createElement("div");
        cardContent.classList.add("card2-content");
        cardContent.innerHTML = `
          <h4 class="card2-title">${hotelData.nombreHotel}</h4>
          <p class="card2-subtitle">${hotelData.playa} - ${hotelData.convenio}</p>
          <p class="card2-subtitle">Price per night: $ ${hotelData.precioxnoche} MXN</p>
          <button type="button" class="btn btn-primary" id="addToTripBtn-${index}">
            Add to my trip!
          </button>
        `;
        cardHotel.appendChild(cardContent);
  
        // Add event listener for the button click
        const addToTripBtn = document.getElementById(`addToTripBtn-${index}`);
        addToTripBtn.addEventListener("click", () => {
          addHotel('usuario', 'correo', hotelData.playa, hotelData.nombreHotel, hotelData.precioxnoche);
        });
      });
    } catch (error) {
      const container = document.createElement("div");
      container.classList.add("error");
      container.innerHTML = "An error occurred while fetching hotels.";
      contenedorHoteles.appendChild(container);
      console.error("An error occurred:", error.message);
    }
  })();
  
  async function addHotel(usuario, correo, playa, hotel, total) {
    try {
        const res = await fetch("http://localhost:3000/viajes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, correo, playa, hotel, total }),
        });
        const data = await res.json();
  
        if (!data.errors) {
            showAlert("success", "Tu reservación se ha realizado con éxito");
        } else {
            showAlert("danger", "Hemos tenido un problema para agendar la reservación");
        }
    } catch (error) {
        showAlert("danger", "Hemos tenido un problema para agendar la reservación");
        console.error("ERROR!!!", JSON.stringify(error));
    }
  }
  