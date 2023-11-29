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

adminSchema.methods.compararContrasenia = function(contrasenia) {
  return bcrypt.compareSync(contrasenia, this.contrasenia);
};

const AdminModel = model('Admin', adminSchema);

module.exports = AdminModel;
