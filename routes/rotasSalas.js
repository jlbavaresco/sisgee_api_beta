const { Router } = require('express');

const { getSalas, addSala, updateSala, deleteSala, getSalaPorCodigo } = require("../controllers/salasController");

const rotasSalas = new Router();

rotasSalas.route('/salas')
   .get(getSalas)
   .post(addSala)
   .put(updateSala)

rotasSalas.route('/salas/:codigo')
   .get(getSalaPorCodigo)
   .delete(deleteSala)

module.exports = { rotasSalas };