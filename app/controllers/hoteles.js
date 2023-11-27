(async () => {
  const contenedorHoteles = document.getElementById("contenedor-hoteles");
  contenedorHoteles.innerHTML = "";
  try {
    const res = await fetch("http://localhost:3000/hotels");
    const data = await res.json();

    data[0].hoteles.forEach((hotel) => {
      const cardHotel = document.createElement("div");
      cardHotel.classList.add("card2");
      cardHotel.innerHTML = `
          <div class="card2-content">
            <h41 class="card2-title">HOTEL:</h41><h14>${hotel.nombreHotel}<br></h14>
            <h41 class="card2-title">PLAYA:</h41><h14>${hotel.playa}<br></h14>
            <h41 class="card2-title">PRECIO x NOCHE:</h41><h14>${hotel.precioxnoche} MXN<br></h14>
            <h41 class="card2-title">CONVENIO:</h41><h14>${hotel.convenio}<br></h14>
    
            <button type="button" class="btn btn-primary" onclick="addHotel('usuario', 'correo', '${hotel.playa}', '${hotel.nombreHotel}', '${hotel.precioxnoche}')">
              Agregar a mi viaje!
            </button>

          </div>
        `;
      contenedorHoteles.appendChild(cardHotel);
    });
  } catch (error) {
    const container = document.createElement("div");
    container.classList.add("error");
    container.innerHTML = "No hotels to show";
    contenedorHoteles.appendChild(container);
    console.log(JSON.stringify(error));
  }
})();

async function addHotel(usuario, correo, playa, hotel, total) {
  const tile = document.createElement("div");
  try {
    const res = await fetch("http://localhost:3000/viajes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, correo, playa, hotel, total }),
    });
    const data = await res.json();
    console.log(data);
    if (!data.errors) {
      tile.innerHTML = `
        <div class="alert alert--success">
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>Bien!</strong> Tu reservación se ha realizado con éxito
        </div>
      `;
    } else {
      tile.innerHTML = `
        <div class="alert alert--danger">
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>Oops!</strong> Hemos tenido un problema para agendar la reservación
        </div>
      `;
    }
    document.body.appendChild(tile);
  } catch (error) {
    tile.innerHTML = `
      <div class="alert alert--danger">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Oops!</strong> Hemos tenido un problema para agendar la reservación
      </div>
    `;
    document.body.appendChild(tile);
    console.error("ERROR!!!", JSON.stringify(error));
  }
}
