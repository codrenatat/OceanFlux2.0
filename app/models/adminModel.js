const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  }
});

const AdminModel = model('Admin', adminSchema);

module.exports = AdminModel;
