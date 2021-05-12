const mongoose = require('mongoose');
const { Schema } = mongoose;

const chargeSchema = new Schema({  
    /*  
        cobros
    */
        Estado: { type: Boolean, required: true },
        IdCobroUsuario: { type: Number, required: true },
        Monto: { type: Number, required: true },
        UserId: { type: String, required: true },
        IdEmpleado: { type: String, required: true },
        Fecha: { type: Date, required: true},
        Nota: { type: String }
})

const Charge = mongoose.model('cobros', chargeSchema, "Cobros");
module.exports = Charge