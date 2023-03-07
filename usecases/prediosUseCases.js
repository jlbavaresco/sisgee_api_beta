const { pool } = require('../config');
const Predio = require('../entities/predio')

const getPrediosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM predios order by codigo');
        return rows.map((predio) => new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla));        
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
        const predio = results.rows[0];
        return new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla);
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
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const predio = results.rows[0];
        return new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla);
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
            const predio = results.rows[0];
            return new Predio(predio.codigo, predio.nome, predio.descricao, predio.sigla);            
        }       
    } catch (err) {
        throw "Erro ao recuperar o prédio: " + err;
    }     
}


module.exports = {
    getPrediosDB, addPredioDB, updatePredioDB, deletePredioDB, getPredioPorCodigoDB
}
