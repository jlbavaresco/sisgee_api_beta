const { pool } = require('../config');

const getPrediosDB = async () => {
    try {    
        const results = await pool.query('SELECT * FROM predios order by codigo');
        return results.rows;
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addPredioDB = async (body) => {
    try {   
        const { nome, descricao, sigla } = body; 
        const results = await pool.query(`INSERT INTO predios (nome, descricao, sigla) 
        values ($1, $2, $3) returning codigo, nome, descricao, sigla`,
        [nome, descricao, sigla]);
        return results.rows[0];
    } catch (err) {
        throw "Erro ao inserir o prédio: " + err;
    }    
}


const updatePredioDB = async (body) => {
    try {   
        const { codigo, nome, descricao, sigla }  = body; 
        const results = await pool.query(`UPDATE predios SET nome=$1, descricao=$2, sigla=$3
        where codigo=$4 returning codigo, nome, descricao, sigla`,
        [nome, descricao, sigla, codigo]);
        return results.rows[0];
    } catch (err) {
        throw "Erro ao alterar o prédio: " + err;
    }      
}

const deletePredioDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM predios WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Prédio removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o prédio: " + err;
    }     
}

const getPredioPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM predios WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            return results.rows[0];
        }       
    } catch (err) {
        throw "Erro ao recuperar o prédio: " + err;
    }     
}


module.exports = {
    getPrediosDB, addPredioDB, updatePredioDB, deletePredioDB, getPredioPorCodigoDB
}
