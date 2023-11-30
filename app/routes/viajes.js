const { Router } = require("express");
const router = Router();

const viajesModel = require("../models/viajesModel");

router.get("/viajes", async (_, res) => {
  try {
    const misViajes = await viajesModel.find();
    res.status(200).json(misViajes);
  } catch (error) {
    res.status(500).send("Cannot get mihotel");
  }
});

router.post("/viajes", async (req, res) => {
  try {
    let newViaje = new viajesModel({
      usuario: req.body.usuario,
      correo: req.body.correo,
      playa: req.body.playa,
      hotel: req.body.hotel,
      total: req.body.total,
    });
    let viajeSave = await newViaje.save();
    res.status(201).json(viajeSave);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/viajes/:id", async (req, res) => {
  try {
    const viajeId = req.params.id;
    const deletedViaje = await viajesModel.findByIdAndDelete(viajeId);

    if (!deletedViaje) {
      return res.status(404).send("Viaje not found");
    }

    res.status(200).json(deletedViaje);
  } catch (error) {
    res.status(500).send("Error deleting viaje");
  }
});


module.exports = router;
