const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    /*  
        clientes
    */
        Estado: { type: Boolean, required: true },
        UserId: { type: String, required: true },
        Tipo: { type: Number },
        TipoCliente: { type: String, required: true},
        Nombre: { type: String, required: true },
        ApellidoPat: { type: String, required: true },
        ApellidoMat: { type: String, required: true },
        Curp: { type: String },
        Colonia: { type: String, required: true },
        Ciudad: { type: String, required: true },
        Direccion: { type: String, required: true },
        Celular: { type: String, required: true },
        Telefono: { type: String, required: true },
        Correo: { type: String },
        Adeudo: { type: Number, required: true },
        Ruta: { type: String, required: true },
        FechaInscripcion: { type: Date }
});

const Client = mongoose.model('clientes', clientSchema, 'Clientes');
module.exports = Client