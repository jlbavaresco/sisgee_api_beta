const { Router } = require('express');

const controleComum = require('./controladores/comum')
const controlePredios = require('./controladores/predios');
const controleSalas = require("./controladores/salas");

const rotas = new Router();

rotas.route('/')
   .get(controleComum.getBemVindo)

rotas.route('/salas')
   .get(controleSalas.getSalas)
   .post(controleSalas.addSala)
   .put(controleSalas.updateSala)

rotas.route('/salas/:codigo')
   .get(controleSalas.getSalaPorCodigo)
   .delete(controleSalas.deleteSala)


rotas.route('/predios')
     .get(controlePredios.getPredios)
     .post(controlePredios.addPredio)
     .put(controlePredios.updatePredio)

rotas.route('/predios/:codigo')
     .get(controlePredios.getPredioPorCodigo)
     .delete(controlePredios.deletePredio)

module.exports = rotas;