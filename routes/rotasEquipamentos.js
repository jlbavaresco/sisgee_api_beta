const { Router } = require('express');

const { getEquipamentosPorSala, addEquipamento, 
        updateEquipamento, deleteEquipamento, getEquipamentoPorCodigo } = require('../controllers/equipamentoController');

const rotasEquipamentos = new Router();

rotasEquipamentos.route('/equipamentos/sala/:codigosala')
     .get(getEquipamentosPorSala);    

rotasEquipamentos.route('/equipamentos')
     .post(addEquipamento)
     .put(updateEquipamento);

rotasEquipamentos.route('/equipamentos/:codigo')
     .get(getEquipamentoPorCodigo)
     .delete(deleteEquipamento);  

module.exports = { rotasEquipamentos };