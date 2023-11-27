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
        enum: ['hombre', 'mujer', 'otro', 'prefiero-no-decirlo'],
        required: true
    }
});

usersSchema.methods.encryptarContrasenia = (contrasenia)=>{
    let hash = bcrypt.hashSync(contrasenia,10);
    return hash;
}

usersSchema.methods.compararContrasenia = function(contrasenia){
    return bcrypt.compareSync(contrasenia,this.contrasenia);
}

module.exports = model('Users', usersSchema);
