const { pool } = require('../config')
const Equipamento = require('../entities/equipamento')

const getEquipamentosPorSalaDB = async (codigosala) => {
    try {
        const results = await pool.query(`SELECT * FROM equipamentos 
        WHERE sala = $1`, [codigosala]);
        if (results.rowCount == 0){
            return  [];
        } else {            
            return results.rows.map((equipamento) => new Equipamento(equipamento.codigo, equipamento.descricao,
                equipamento.numero_serie, equipamento.valor, equipamento.sala));
        }
    } catch(err){
        throw "Erro: " + err;
    }
}

const addEquipamentoDB = async (body) => {
    try {
        const { descricao, numero_serie, valor, sala } = body;
        const results = await pool.query(`INSERT INTO equipamentos (descricao, numero_serie,
            valor, sala) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, descricao, numero_serie, valor, sala`, 
            [descricao, numero_serie, valor, sala]);
        const equipamento = results.rows[0];
        return new Equipamento(equipamento.codigo, equipamento.descricao,
            equipamento.numero_serie, equipamento.valor, equipamento.sala);
    } catch (err){
        throw "Erro ao inserir o equipamento: " + err;
    }
}

const updateEquipamentoDB = async (body) => {
    try {
        const { codigo, descricao, numero_serie, valor, sala } = body;
        const results = await pool.query(`UPDATE equipamentos SET descricao=$1,
        numero_serie=$2, valor = $3, sala = $4 WHERE codigo=$5 
        RETURNING codigo, descricao, numero_serie, valor, sala`, 
            [descricao, numero_serie, valor, sala, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const equipamento = results.rows[0];
        return new Equipamento(equipamento.codigo, equipamento.descricao,
            equipamento.numero_serie, equipamento.valor, equipamento.sala);
    } catch (err){
        throw "Erro ao alterar o equipamento: " + err;
    }
}

const deleteEquipamentoDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM equipamentos 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Equipamento de código ${codigo} removido com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover o equipamento: " + err;
    }
}

const getEquipamentoPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM equipamentos 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const equipamento = results.rows[0];
            return new Equipamento(equipamento.codigo, equipamento.descricao,
                equipamento.numero_serie, equipamento.valor, equipamento.sala);
        }
    } catch (err){
        throw "Erro ao recuperar o equipamento: " + err;
    }
}

module.exports = { getEquipamentosPorSalaDB, addEquipamentoDB, updateEquipamentoDB, 
    deleteEquipamentoDB, getEquipamentoPorCodigoDB }