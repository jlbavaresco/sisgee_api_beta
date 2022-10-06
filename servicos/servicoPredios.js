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


module.exports = {
    getPrediosDB, addPredioDB
}
