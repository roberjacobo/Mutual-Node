const Payment = require('../Models/payment');

const controller = {};

controller.create = async (req, res) => {
    const payment = new Payment(req.body);
    await Payment.create(payment);
    res.json({
        'status': 'Pago Guardado Exitosamente'
    });
};

controller.getList = async (req, res) => {
    const payments = await Payment.find({});
    res.json(payments);
};


controller.edit = async (req, res) => {
    const { id } = req.params;
    const payment = {

        Estado: req.body.Estado,
        Monto: req.body.Monto,
        Fecha: req.body.Fecha,
        Concepto: req.body.Concepto

    };
    await Payment.findByIdAndUpdate(id, { $set: payment }, { new: true });
    res.json({ status: 'Egreso Actualizado' });
};

controller.delete = async (req, res, next) => {
    await Payment.findByIdAndRemove(req.params.id);
    res.json({ status: 'Egreso Eliminado' });
};

controller.get = async (req, res, next) => {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    res.json(payment);
};

module.exports = controller;