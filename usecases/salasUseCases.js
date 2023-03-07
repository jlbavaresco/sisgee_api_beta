const { pool } = require('../config');
const Sala = require('../entities/sala')

const getSalasDB = async () => {
    try {
        const { rows } = await pool.query(`select s.codigo as codigo, s.numero as numero, 
        s.descricao as descricao, s.capacidade as capacidade, 
        s.predio as predio, p.nome as nomepredio
        from salas s
        join predios p on s.predio = p.codigo
        order by s.codigo`);
        return rows.map((sala) => new Sala(sala.codigo, sala.numero, sala.descricao, sala.capacidade,
            sala.predio, sala.nomepredio));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addSalaDB = async (body) => {
    try {
        const { numero, descricao, capacidade, predio } = body;
        const results = await pool.query(`insert into salas (numero, descricao, capacidade, predio) 
        values ($1, $2, $3, $4)
        returning codigo, numero, descricao, capacidade, predio`,
            [numero, descricao, capacidade, predio]);
        const sala = results.rows[0];
        return new Sala(sala.codigo, sala.numero, sala.descricao, sala.capacidade,
            sala.predio, "");
    } catch (err) {
        throw "Erro ao inserir a sala: " + err;
    }
}


const updateSalaDB = async (body) => {
    try {
        const { codigo, numero, descricao, capacidade, predio } = body;
        const results = await pool.query(`UPDATE salas
        SET numero=$1, descricao=$2, capacidade=$3, predio=$4
        WHERE codigo=$5 returning codigo, numero, descricao, capacidade, predio`,
            [numero, descricao, capacidade, predio, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const sala = results.rows[0];
        return new Sala(sala.codigo, sala.numero, sala.descricao, sala.capacidade,
            sala.predio, "");
    } catch (err) {
        throw "Erro ao alterar a sala: " + err;
    }
}

const deleteSalaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM salas WHERE codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Sala removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a sala: " + err;
    }
}

const getSalaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM salas WHERE codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const sala = results.rows[0];
            return new Sala(sala.codigo, sala.numero, sala.descricao, sala.capacidade,
                sala.predio, "");
        }
    } catch (err) {
        throw "Erro ao recuperar a sala: " + err;
    }
}


module.exports = {
    getSalasDB, addSalaDB, updateSalaDB, deleteSalaDB, getSalaPorCodigoDB
}
