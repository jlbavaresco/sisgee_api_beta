const { pool } = require('../config');

const getSalas = (request, response) => {
    pool.query(`select s.codigo as codigo, s.numero as numero, 
        s.descricao as descricao, s.capacidade as capacidade, 
        s.predio as predio, p.nome as nomepredio
        from salas s
        join predios p on s.predio = p.codigo
        order by s.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar as salas: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addSala = (request, response) => {
    const {numero, descricao, capacidade, predio} = request.body;
    pool.query(`insert into salas (numero, descricao, capacidade, predio) 
    values ($1, $2, $3, $4)
    returning codigo, numero, descricao, capacidade, predio`, 
    [numero, descricao, capacidade, predio] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir a sala!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Sala criada!",
            objeto : results.rows[0]
        });
    })
}

const updateSala = (request, response) => {
    const {codigo, numero, descricao, capacidade, predio} = request.body;
    pool.query(`UPDATE salas
	SET numero=$1, descricao=$2, capacidade=$3, predio=$4
	WHERE codigo=$5
returning codigo, numero, descricao, capacidade, predio`, 
    [numero, descricao, capacidade, predio, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar a sala!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Sala criada!",
            objeto : results.rows[0]
        });
    })
}


const deleteSala = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM salas WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover a sala! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Sala removida!"
        });
    })
}

const getSalaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM salas WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar a sala!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {
    getSalas, addSala, updateSala, deleteSala, getSalaPorCodigo
}
