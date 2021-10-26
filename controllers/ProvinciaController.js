//Importo modelo de datos
const db = require("../models");
const provincias = db.provincia;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

var caModel  = require('../models').ca;  //Add for dependency response

const ProvinciaModel = {}; //Create the object controller



//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all provincias from database
ProvinciaModel.getAll = (req, res) => {
    
    provincias.findAll({include: [{ model:caModel}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving provincias."
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET provincias by Id from database
ProvinciaModel.getById = (req, res) => {
    const id = req.params.id;

    provincias.findByPk(id, {include: [{ model:caModel}]})
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
          message: "Error retrieving provincias with id=" + id
        });
      });
  };



//-------------------------------------------------------------------------------------
//CREATE a new provincia in database
ProvinciaModel.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a provincias
    const newprovincia = {
      cp: req.body.cp,
      nombre: req.body.nombre,
      poblacion: req.body.poblacion,
      superficie: req.body.superficie,
      caId: req.body.caId
    };
  
    // Save provincias in the database
    provincias.create(newprovincia)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the provincia."
        });
      });
  };


//-------------------------------------------------------------------------------------
//UPDATE a provincia from database
ProvinciaModel.update = (req, res) => {
    const id = req.params.id;
  
    provincias.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "provincia was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update provincia with id=${id}. Maybe provincia was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating provincia with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//GET provincia by nombre from database 
//FindBynombre
  ProvinciaModel.getByNombre = (req, res) => {
    provincias.findAll({ where: { nombre: req.params.nombre } })
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
//DELETE a provincia by Id from database
ProvinciaModel.delete = (req, res) => {
    const id = req.params.id;
  
    provincias.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "provincia was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete provincia with id=${id}. Maybe provincia was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete provincia with id=" + id
        });
      });
  };


//-------------------------------------------------------------------------------------
//DELETE all provincias from database
//delete all provincias 
  ProvinciaModel.deleteAll = (req, res) => {
    provincias.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} provincias were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all provincias."
        });
      });
  };

module.exports = ProvinciaModel;