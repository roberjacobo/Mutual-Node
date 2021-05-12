const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  /*
    Empleados
    */
  Estado: { type: Boolean, required: true },
  EmployeeId: { type: String, required: true },
  Nombre: { type: String, required: [true, "campo requerido"] },
  ApellidoPat: { type: String, required: [true, "campo requerido"] },
  ApellidoMat: { type: String, required: [true, "campo requerido"] },
  Curp: { type: String, required: [true, "campo requerido"] },
  Colonia: { type: String, required: [true, "campo requerido"] },
  Direccion: { type: String, required: [true, "campo requerido"] },
  Celular: { type: String, required: true },
  Telefono: { type: String, required: [true, "campo requerido"] },
  Correo: { type: String, unique: true, required: [true, "campo requerido"] },
  Contrasenia: { type: String, required: [true, "campo requerido"] },
  Rol: { type: String, required: true, default: "EMPLOYEE_ROLE" },
  Salario: { type: Number },
  fechaIngreso: { type: Date, required: true },
});

employeeSchema.plugin(mongooseUniqueValidator, {
  message: "{ PATH } Este empleado ya está registrado.",
});

const Employee = mongoose.model("empleados", employeeSchema, "Empleados");
module.exports = Employee;