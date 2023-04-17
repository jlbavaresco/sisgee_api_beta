const { Router } = require('express');

const { getBemVindo } = require('../controllers/comumController')

const {rotasPredios} = require('./rotasPredios');
const {rotasSalas} = require('./rotasSalas');

const rotas = new Router();

rotas.route('/')
   .get(getBemVindo)

rotas.use(rotasPredios);
rotas.use(rotasSalas);

module.exports = rotas;