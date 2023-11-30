const { Router } = require("express");
const router = Router();

const AdminModel = require("../models/adminModel");

router.get("/admin", async (req, res) => {
  try {
    const miAdmin = await AdminModel.find();
    res.status(200).json(miAdmin);
  } catch (error) {
    res.status(500).send("Cannot get miAdmin");
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const { nombre, contrasenia } = req.body;
    console.log("Solicitud de inicio de sesión recibida:", { nombre, contrasenia }); // Imprime los datos recibidos

    const admin = await AdminModel.findOne({ nombre });
    console.log("Admin encontrado:", admin ? "Sí" : "No"); // Verifica si el admin existe

    if (!admin) {
      return res.status(404).json({ mensaje: "No se encontró el administrador." });
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Error en /admin/login:", error); // Imprime errores
    res.status(500).send("Error en el servidor");
  }
});


module.exports = router;

module.exports = router;