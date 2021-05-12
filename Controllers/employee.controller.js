const { find, db } = require("../Models/employee");
const Employee = require('../Models/employee');

const controller = {};

controller.getList = async (req, res, next) => {
  console.log(req.query);
  let { q } = req.query;
  q = q.charAt(0).toUpperCase() + q.slice(1);
  const busqueda = q === "" ? {} : { ApellidoPat: new RegExp("^" + q) };
  const employees = await Employee.find(busqueda);
  res.json(employees);
};

controller.create = async (req, res) => {
  const employee = new Employee(req.body);
  await Employee.create(employee);
  res.json({
    status: "Empleado Guardado Exitosamente"
  });
};

controller.edit = async (req, res) => {
  const { EmployeeId } = req.body;
  await Employee.updateOne({ EmployeeId }, { $set: req.body, $currentDate: { lastModified: true } });
  res.json({ status: "Empleado Actualizado" });
};

controller.delete = async (req, res, next) => {
  await Employee.findByIdAndRemove(req.params.id);
  res.json({ status: 'Empleado Eliminado' });
};

controller.get = async (req, res, next) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.json(employee);
};

module.exports = controller;