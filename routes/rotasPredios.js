const { Router } = require('express');

const { getPredios, addPredio, updatePredio, deletePredio, getPredioPorCodigo } = require('../controllers/prediosController');

const rotasPredios = new Router();




rotasPredios.route('/predios')
   .get(getPredios)
   .post(addPredio)
   .put(updatePredio)

rotasPredios.route('/predios/:codigo')
   .get(getPredioPorCodigo)
   .delete(deletePredio)

module.exports = { rotasPredios };