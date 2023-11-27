const {Schema, model} = require('mongoose');

const viajesSchema = new Schema({
    usuario: {
        type: String,
        required: true
      },
      correo: {
        type: String,
        required: true
      },
      playa: {
        type: String,
        required: true
      },
      hotel: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
});

module.exports = model('Viaje', viajesSchema);