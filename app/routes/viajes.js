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

module.exports = router;
