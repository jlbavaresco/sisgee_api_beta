class Equipamento {
    constructor(codigo, descricao, numero_serie, valor, sala){
        this.codigo = codigo;
        this.descricao = descricao;
        this.numero_serie = numero_serie;
        this.valor = valor;
        this.sala = sala;
    }
}

module.exports = Equipamento;