const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({  
/*  
        egresos
    */
    Estado: { type: Boolean, required: true },
    Monto: { type: Number, required: true },
    Fecha: { type: Date, required: true },
    Concepto: { type: String, required: true }
})

const Payment = mongoose.model('egresos', paymentSchema, 'Egresos');
module.exports = Payment 

