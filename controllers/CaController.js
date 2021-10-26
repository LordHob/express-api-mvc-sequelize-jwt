//Importo modelo de datos
const db = require("../models");
const ca = db.ca;
const Op = db.Sequelize.Op; //Import all ORM sequelize functions 

const CaController = {}; //Create the object controller


//CRUD end-points Functions
//-------------------------------------------------------------------------------------
//GET all categories from database
CaController.getAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;

  ca.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};


//-------------------------------------------------------------------------------------
//GET categories by Id from database
CaController.getById = (req, res) => {
  const id = req.params.id;

  ca.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving categories with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
//CREATE a new category in database
CaController.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Category
  const newCa = {
    nombre: req.body.nombre,
    poblacion: req.body.poblacion,
    superficie: req.body.superficie,
  };

  // Save Category in the database
  ca.create(newCa)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the newCategory."
      });
    });
};


//-------------------------------------------------------------------------------------
//UPDATE a category from database
CaController.update = (req, res) => {
  const id = req.params.id;

  ca.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Movie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
//GET categories by Type from database  
//FindByType
CaController.getByNombre = (req, res) => {
  ca.findAll({ where: { nombre: req.params.nombre } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};


//-------------------------------------------------------------------------------------
//DELETE a category by Id from database
CaController.delete = (req, res) => {
  const id = req.params.id;

  ca.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Movie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};


//-------------------------------------------------------------------------------------
//DELETE all categories from database
//delete all categories   
CaController.deleteAll = (req, res) => {
  ca.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} categories were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories."
      });
    });
};

module.exports = CaController;