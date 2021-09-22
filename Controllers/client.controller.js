const {
  find,
  db
} = require("../Models/client");
const Client = require("../Models/client");

const controller = {};

controller.getList = async (req, res, next) => {
  //1.-Hacer una variable búsqueda que tenga una condición con base en serachText (Aggregator)
  //2.- usar .find() con la variable del paso 1 debe regresar un array
  //3.-Usar lo que me dio el .find con .length para obtener el total de registros
  //4.-El número del paso anterior dividido entre 30 y usar .mathFloor()
  try {
    //Sección donde se filtran los empleados con searchText
    let {
      searchText,
      page
    } = req.body;

    var newPage = page - 1;
    var pageLimit = 30;
    //0-30 31-60
    const regexp = new RegExp("^" + searchText, "i");
    const search = searchText.trim() === "" ? {} : { $or: [{ ApellidoPat: regexp }, { UserId: regexp }, { Ruta: regexp }] }

    const clients = await Client.find(search).skip((newPage * pageLimit)).limit(pageLimit);

    var clientsCountSearch = await Client.find(search).countDocuments();
    const totalClients = await Client.find({}).countDocuments();
    // el número de páginas de 30 empleados c/u
    var tempTotalPages = (clientsCountSearch / 30);
    if (tempTotalPages % 1 === 0) {
      var totalPages = (tempTotalPages)
    } else {
      var totalPages = (Math.floor(tempTotalPages) + 1);
    }

    const clientsInfo = {
      totalPages,
      totalClients,
      clientsCountSearch,
      clients
    }
    res.json(clientsInfo);
  } catch (error) {
    console.log(error)
  }
};



//Crear nuevo cliente
controller.create = async (req, res) => {
  const client = new Client(req.body);
  await Client.create(client);
  res.json({
    status: "Cliente Guardado Exitosamente",
  });
};

controller.edit = async (req, res) => {
  const {
    UserId
  } = req.body;
  await Client.updateOne({
    UserId
  }, {
    $set: req.body,
    $currentDate: {
      lastModified: true
    }
  });
  res.json({
    status: "Cliente Actualizado"
  });
};

controller.editClientAmount = async (req, res) => {
  const {
    UserId,
    Adeudo
  } = req.body;
  const client = {
    Adeudo,
  };
  await Client.updateOne({
    UserId
  }, {
    $set: client,
    $currentDate: {
      lastModified: true
    }
  });
  res.json({
    status: "Adeudo del cliente actualizado"
  });
};

controller.delete = async (req, res, next) => {
  await Client.findByIdAndRemove(req.params.id);
  res.json({
    status: "Cliente Eliminado"
  });
};

controller.get = async (req, res, next) => {
  const {
    id
  } = req.params;
  const client = await Client.findById(id);
  res.json(client);
};
//admin mete la cantidad, update con cantidad, 
//consulta a la DB para traer a los clientes, 
//ciclo para extraer ID, UPTADE


controller.postChargesToClients = async (req, res, next) => {
  const {
    cantidadACobrar
  } = req.body;
  //console.log(cantidadACobrar);
  const clients = await Client.find({});
  //console.log("clientes chidos", clients)
  //console.log("update")
  for (let index = 0; index < clients.length; index += 1) {
    console.log(clients[index])
    try {
      await Client.updateOne({
        "_id": clients[index]._id
      }, {
        $set: {
          "Adeudo": clients[index].Adeudo + cantidadACobrar
        }
      }, {
        upsert: false,
        multi: true
        // If set to true, updates multiple documents that meet the query criteria. 
        // If set to false, updates one document. 
        // The default value is false. 
      })
    } catch (error) {
      res.json(error)
    }
  }
  res.json({
    status: "Adeudo de Clientes Actualizado"
  })
};

//Totales
controller.getClientsAmount = async (req, res, next) => {
  const clientsAmount = await Client.aggregate([{
    $match: {}
  },
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: "$Adeudo"
        }
      }
    }
  ]).then(response => res.json(response[0].totalAmount));
};

controller.resetCharges = async (req, res, next) => {
  const clients = await Client.find({});

  for (let index = 0; index < clients.length; index += 1) {
    console.log(clients[index]);
    try {
      await Client.updateOne({
        "_id": clients[index]._id
      }, {
        $set: {
          "Adeudo": 0
        }
      }, {
        upsert: false,
        multi: true
      });
    } catch (error) {
      res.json(error);
    }
  }
  res.json({
    status: "Adeudo de clientes a cero."
  });
};

module.exports = controller;