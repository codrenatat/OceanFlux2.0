const {Schema, model} = require('mongoose');

const hotelSchema = new Schema({
  nombreHotel: {
    type: String,
    required: true
  },
  playa: {
    type: String,
    required: true
  },
  precioxnoche: {
    type: String,
    required: true
  },
  convenio: {
    type: [String],
    required: true
  }
});

module.exports = model('Hotel', hotelSchema);