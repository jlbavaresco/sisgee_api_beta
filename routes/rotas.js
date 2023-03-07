const { Router } = require('express');

const comumController = require('../controllers/comumController')
const prediosController = require('../controllers/prediosController');
const salasController = require("../controllers/salasController");

const rotas = new Router();

rotas.route('/')
   .get(comumController.getBemVindo)

rotas.route('/salas')
   .get(salasController.getSalas)
   .post(salasController.addSala)
   .put(salasController.updateSala)

rotas.route('/salas/:codigo')
   .get(salasController.getSalaPorCodigo)
   .delete(salasController.deleteSala)


rotas.route('/predios')
     .get(prediosController.getPredios)
     .post(prediosController.addPredio)
     .put(prediosController.updatePredio)

rotas.route('/predios/:codigo')
     .get(prediosController.getPredioPorCodigo)
     .delete(prediosController.deletePredio)

module.exports = rotas;