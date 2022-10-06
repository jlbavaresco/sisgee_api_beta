const { pool } = require('../config');

const dbPredios = require('../servicos/servicoPredios')

const getPredios = async (request, response) => {
    await dbPredios.getPrediosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o prédio: ' + err
        }));
}

const addPredio = async (request, response) => {
    await dbPredios.addPredioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Prédio criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));    
}

const updatePredio = (request, response) => {
    const { codigo, nome, descricao, sigla } = request.body;
    pool.query(`UPDATE predios SET nome=$1, descricao=$2, sigla=$3
    where codigo=$4 returning codigo, nome, descricao, sigla`,
        [nome, descricao, sigla, codigo],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao alterar o prédio: ' + error
                })
            }
            response.status(200).json({
                status: "success", message: "Prédio alterado",
                objeto: results.rows[0]
            })
        })
}

const deletePredio = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM predios WHERE codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao remover o prédio: ' +
                        (error ? error : 'Não removeu nenhuma linha')
                })
            }
            response.status(200).json({
                status: "success", message: "Prédio removido"
            })
        })
}

const getPredioPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM predios WHERE codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json({
                    status: 'error',
                    message: 'Erro ao recuperar o prédio: ' +
                        (error ? error : 'Não encontrou nenhuma linha')
                })
            }
            response.status(200).json(results.rows[0])
        })
}

module.exports = {
    getPredios, addPredio, updatePredio, deletePredio, getPredioPorCodigo
}

