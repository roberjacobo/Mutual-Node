var express = require("express");

const router = express.Router();
var Employee = require("../Models/employee");

router.post("/", (req, res) => {
  var body = req.body;

  Employee.findOne({ Correo: body.Correo }, (err, employeeDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar usuario (verificar el correo ingresado)",
        errors: err,
      });
    }
    if (!employeeDB) {
      return res.status(400).json({
        ok: false,
        mensaje: "Credenciales incorrectas - email",
        errors: err,
      });
    }

    if (body.Contrasenia === employeeDB.Contrasenia) {
      //console.log("employeeDB.EmployeeId: ", employeeDB.EmployeeId);
      return res.status(200).json({
        ok: true,
        id: employeeDB.EmployeeId,
        mensaje: "Login post correcto",
        rol: employeeDB.Rol,
      });
    } else {
      return res.status(400).json({
        ok: false,
        mensaje: "Credenciales incorrectas - contraseña",
        errors: err,
      });
    }
  });
});

module.exports = router;
