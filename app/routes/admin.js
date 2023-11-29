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
    const admin = await AdminModel.findOne({ nombre });

    if (!admin) {
      return res.status(404).json({ mensaje: "No se encontró el administrador." });
    }

    // Verificar la contraseña
    if (admin.compararContrasenia(contrasenia)) {
      res.status(200).json(admin);
    } else {
      res.status(401).json({ mensaje: "La contraseña no es correcta." });
    }
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});


module.exports = router;