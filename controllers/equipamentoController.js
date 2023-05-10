const { getEquipamentosPorSalaDB, addEquipamentoDB, updateEquipamentoDB, 
    deleteEquipamentoDB, getEquipamentoPorCodigoDB } = require('../usecases/equipamentoUseCases');
  
  const getEquipamentosPorSala = async (request, response) => {
      await getEquipamentosPorSalaDB(request.params.codigosala)
            .then(data => response.status(200).json(data))
            .catch(err => {
              response.status(400).json({
                  status : 'error',
                  message : 'Erro ao consultar os equipamentos da sala: ' + err
              })
            })
  }
  
  const addEquipamento = async (request, response) => {
      await addEquipamentoDB(request.body)
            .then(data => response.status(200).json({
              status : "success", message : "Equipamento criado",
              objeto : data
            }))
            .catch(err => response.status(400).json({
              status : "error", message: err
            }))
  }
  
  const updateEquipamento = async (request, response) => {
      await updateEquipamentoDB(request.body)
            .then(data => response.status(200).json({
              status : "success", message : "Equipamento alterado",
              objeto : data
            }))
            .catch(err => response.status(400).json({
              status : "error", message: err
            }))
  }
  
  const deleteEquipamento = async (request, response) => {
      await deleteEquipamentoDB(request.params.codigo)
            .then(data => response.status(200).json({
              status : "success", message : data
            }))
            .catch(err => response.status(400).json({
              status : "error", message: err
            }))
  }
  
  const getEquipamentoPorCodigo = async (request, response) => {
      await getEquipamentoPorCodigoDB(request.params.codigo)
            .then(data => response.status(200).json(data))
            .catch(err => response.status(400).json({
              status : "error", message: err
            }))
  }
  
  module.exports = { getEquipamentosPorSala, addEquipamento, 
      updateEquipamento, deleteEquipamento, getEquipamentoPorCodigo }
  