const { find, db } = require("../Models/client");
const Client = require("../Models/client");

const controller = {};
/* Buscar una manera para que la función reciba otro parámetro además de searchText que sea el último ID de la página que tengo
Buscar cómo funciona el .find (mongoose) con aggregators  */
controller.getList = async (req, res, next) => {
  console.log("req.query", req.query);
  //console.log("Client: ",await Client.find({ApellidoPat: "Jacobo"}));
  let { searchText } = req.query;
  //if (searchText.trim() === "") return;    
  //searchText = searchText.charAt(0).toUpperCase() + searchText.slice(1);
  //Se ejecuta el método find en la DB
  //const busqueda = searchText === "" ? {} : { ApellidoPat: new RegExp("^" + searchText) };
  const regexp = new RegExp("^" + searchText, "i")
  const busqueda = searchText.trim() === "" ? {} : { $or: [{ ApellidoPat: regexp }, { UserId: regexp }, { Ruta: regexp }] }
  const clients = await Client.find(busqueda);
  //console.log("clients: ",clients)
  res.json(clients);
  //paginación
  /*   try{
      
    } catch (e) {
      return res.status(500).json(e)
    } */
};

controller.create = async (req, res) => {
  const client = new Client(req.body);
  await Client.create(client);
  res.json({
    status: "Cliente Guardado Exitosamente",
  });
};

controller.edit = async (req, res) => {
  const { UserId } = req.body;
  await Client.updateOne({ UserId }, { $set: req.body, $currentDate: { lastModified: true } });
  res.json({ status: "Cliente Actualizado" });
};

controller.editClientAmount = async (req, res) => {
  const { UserId, Adeudo } = req.body;
  const client = {
    Adeudo,
  };
  await Client.updateOne(
    { UserId },
    {
      $set: client,
      $currentDate: { lastModified: true }
    },
  );
  res.json({ status: "Adeudo del cliente actualizado" });
};

controller.delete = async (req, res, next) => {
  await Client.findByIdAndRemove(req.params.id);
  res.json({ status: "Cliente Eliminado" });
};

controller.get = async (req, res, next) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  res.json(client);
};
//admin mete la cantidad, update con cantidad, 
//consulta a la DB para traer a los clientes, 
//ciclo para extraer ID, UPTADE


controller.postChargesToClients = async (req, res, next) => {
  const { cantidadACobrar } = req.body;
  //console.log(cantidadACobrar);
  const clients = await Client.find({ })
  //console.log("clientes chidos", clients)
  //console.log("update")
  for (let index = 0; index < clients.length; index += 1) {
    console.log(clients[index])
    try {
      await Client.updateOne(
        { "_id": clients[index]._id },
        { $set: { "Adeudo": clients[index].Adeudo + cantidadACobrar } },
        {
          upsert: false,
          multi: true
          // If set to true, updates multiple documents that meet the query criteria. 
          // If set to false, updates one document. 
          // The default value is false. 
        })
    } catch (error) { res.json(error) }
  }
  res.json({ status: "Adeudo de Clientes Actualizado" })
};

  //Totales
  controller.getClientsAmount = async (req, res, next) => {
    const clientsAmount = await Client.aggregate([
      { $match: {} },
      {
        $group:
        {
          _id: null, totalAmount: { $sum: "$Adeudo" }
        }
      }
    ]).then(response => res.json(response[0].totalAmount));
  };

  module.exports = controller;
