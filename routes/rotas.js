const { Router } = require('express');

const { getBemVindo } = require('../controllers/comumController')
const { getPredios, addPredio, updatePredio, deletePredio, getPredioPorCodigo } = require('../controllers/prediosController');
const { getSalas, addSala, updateSala, deleteSala, getSalaPorCodigo } = require("../controllers/salasController");

const rotas = new Router();

rotas.route('/')
   .get(getBemVindo)

rotas.route('/salas')
   .get(getSalas)
   .post(addSala)
   .put(updateSala)

rotas.route('/salas/:codigo')
   .get(getSalaPorCodigo)
   .delete(deleteSala)


rotas.route('/predios')
     .get(getPredios)
     .post(addPredio)
     .put(updatePredio)

rotas.route('/predios/:codigo')
     .get(getPredioPorCodigo)
     .delete(deletePredio)

module.exports = rotas;