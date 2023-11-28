const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        min: 0,
        max: 120,
        required: true
    },
    genero: {
        type: String,
        enum: ['Masculine', 'Femenine', 'Other'],
        required: true
    }
});

usersSchema.statics.encryptarContrasenia = function(contrasenia) {
    return bcrypt.hashSync(contrasenia, 10);
};


usersSchema.methods.compararContrasenia = function(contrasenia){
    return bcrypt.compareSync(contrasenia,this.contrasenia);
}

module.exports = model('Users', usersSchema);
