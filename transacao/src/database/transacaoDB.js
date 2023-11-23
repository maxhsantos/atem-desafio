const db = require("./dbConnection");
const counterDB = require("./counterDB");
const collectionTransacao = "transacao";
const collectionSaldo = "saldo";
const collectionCliente = "cliente";

const criar = async (data) => {
  try {
    let { clienteId, quantidade, tipo } = data;

    let saldoInicial = 0;
    const transacoes = await db.findAll(collectionTransacao, {
      clienteId: Number(clienteId),
    });

    // calcula as transacoes e verifica o saldo
    if (transacoes.length) {
      transacoes.forEach((element) => {
        saldoInicial += element.quantidade;
      });
    }
    if (tipo === "debito") {
      // Em transacoes de debito o valor precisa ser negativo
      if (quantidade > 0) {
        throw new Error(`O valor para esta operação precisa ser negativo!`);
      }
    } else if (tipo === "credito") {
      // Em transacoes de credito o valor precisa ser positivo
      if (quantidade < 0) {
        throw new Error(`O valor para esta operação precisa ser positivo!`);
      }
    } else {
      throw new Error(`Tipo de transação não identificada!`);
    }

    const saldoFinal = Number(saldoInicial) + Number(quantidade);
    //verifica se a operação vai deixar o saldo negativo se for debito
    if (tipo === "debito" && saldoFinal < 0) {
      throw new Error(`Saldo insuficiente!`);
    }

    const novaTransacaoId = await counterDB.listarNovoId(collectionTransacao);
    const novaTransacao = {
      clienteId,
      quantidade,
      tipo,
      transacaoId: novaTransacaoId,
    };
    // cria uma nova transacao
    await db.insertOne(collectionTransacao, novaTransacao);
    // atualiza o saldo do cliente
    await db.updateOne(
      collectionSaldo,
      { quantidade: saldoFinal },
      { clienteId }
    );
    return novaTransacao;
  } catch (error) {
    throw new Error(`Erro ao tentar criar transacao: ${error.message}`);
  }
};

const listarSaldoId = async (id) => {
  try {
    const cliente = await db.findOne(collectionCliente, {
      clienteId: Number(id),
    });

    if (!cliente) {
      throw new Error(`Cliente não encontrado`);
    }

    const saldo = await db.findOne(collectionSaldo, {
      clienteId: Number(cliente.clienteId),
    });

    if (!saldo) {
      throw new Error(`Saldo não encontrado`);
    }
    return saldo.quantidade;
  } catch (error) {
    throw new Error(`Erro ao tentar listar saldo por ID: ${error.message}`);
  }
};

module.exports = {
  criar,
  listarSaldoId,
};
