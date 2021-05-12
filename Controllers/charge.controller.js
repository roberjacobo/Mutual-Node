const Charge = require('../Models/charge');

const controller = {};

controller.getList = async (req, res, next) => {
    const charges = await Charge.find();
    res.json(charges);
};

controller.create = async (req, res) => {
    const charge = new Charge(req.body);
    await Charge.create(charge);
    res.json({
        'status': 'Cobro Guardado Exitosamente'
    });
};

controller.edit = async (req, res) => {
    const { id } = req.params;
    const charge = {

        Estado: req.body.Estado,
        IdCobroUsuario: req.body.IdCobroUsuario,
        Monto: req.body.Monto,
        UserId: req.body.IdCliente,
        IdEmpleado: req.body.IdEmpleado,
        Fecha: req.body.Fecha,
        Nota: req.body.Nota

    };
    await Charge.findByIdAndUpdate(id, { $set: charge }, { new: true });
    res.json({ status: 'Cobro Actualizado' });
};

controller.delete = async (req, res, next) => {
    await Charge.findByIdAndRemove(req.params.id);
    res.json({ status: 'Cobro Eliminado' });
};

controller.get = async (req, res, next) => {
    const { id } = req.params;
    const charge = await Charge.findById(id);
    res.json(charge);
};

module.exports = controller;