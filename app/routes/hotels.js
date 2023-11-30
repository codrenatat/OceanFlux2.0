const { Router } = require("express");
const router = Router();

const hotelModel = require("../models/hotelModel");

router.get("/hotels", async (req, res) => {
  try {
    const mihotels = await hotelModel.find();
    res.status(200).json(mihotels);
  } catch (error) {
    res.status(500).send("Cannot get mihotel");
  }
});

router.get('/hotels/:playa', async (req, res) => {
  try {
    const playa = req.params.playa;

    const hotelsInPlaya = await hotelModel.find({ playa: playa });

    if (!hotelsInPlaya || hotelsInPlaya.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron hoteles en la playa especificada." });
    }

    res.status(200).json(hotelsInPlaya);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});


router.post("/hotels", async (req, res) => {
  try {
    let newHotel = new hotelModel({
      nombreHotel: req.body.nombreHotel,
      playa: req.body.playa,
      precioxnoche: req.body.precioxnoche,
      convenio: req.body.convenio,
    });
    let hotelSave = await newHotel.save();
    res.status(201).json(hotelSave);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/hotels/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    await hotelModel.findByIdAndDelete(hotelId);
    res.status(200).json({ mensaje: "Hotel eliminado con éxito" });
  } catch (error) {
    res.status(500).send("Error al eliminar el hotel: " + error.message);
  }
});

module.exports = router;