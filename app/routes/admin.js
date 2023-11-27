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

module.exports = router;