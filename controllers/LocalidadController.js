//Importo modelo de datos
const db = require("../models");
const localidades = db.localidad;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var provinciaModel = require('../models').provincia;  //Add for dependency response

const LocalidadController = {}; //Create the object controller



//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all localidades from database
LocalidadController.getAll = (req, res) => {
  localidades.findAll({ include: [{ model: provinciaModel }] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving localidades."
      });
    });
};


//-------------------------------------------------------------------------------------
//GET localidades by Id from database
LocalidadController.getById = (req, res) => {
  const id = req.params.id;
  localidades.findByPk(id, { include: [{ model: provinciaModel }] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving localidades with id=" + id
      });
    });
};



//-------------------------------------------------------------------------------------
//CREATE a new localidad in database
LocalidadController.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a localidades
  const newLocalidad = {
    nombre: req.body.nombre,
    poblacion: req.body.poblacion,
    capital_pro: req.body.capital_pro,
    capital_ca: req.body.capital_ca,
    provinciaId: req.body.provinciaId
  };

  // Save localidades in the database
  localidades.create(newLocalidad)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the localidad."
      });
    });
};


//-------------------------------------------------------------------------------------
//UPDATE a localidad from database
LocalidadController.update = (req, res) => {
  const id = req.params.id;

  localidades.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "localidad was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update localidad with id=${id}. Maybe localidad was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating localidad with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
//GET localidad by Name from database 
//FindByName
LocalidadController.getByName = (req, res) => {
  localidades.findAll({ where: { nombre: req.params.nombre } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


//-------------------------------------------------------------------------------------
//DELETE a localidad by Id from database
LocalidadController.delete = (req, res) => {
  const id = req.params.id;

  localidades.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "localidad was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete localidad with id=${id}. Maybe localidad was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete localidad with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
//DELETE all localidades from database
//delete all localidades 
LocalidadController.deleteAll = (req, res) => {
  localidades.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} localidades were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all localidades."
      });
    });
};

module.exports = LocalidadController;