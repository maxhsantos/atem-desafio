const db = require("./dbConnection");
const counterDB = require("./counterDB");
const collectionCliente = "cliente";
const collectionSaldo = "saldo";

const criar = async (data) => {
  try {
    const novoClienteId = await counterDB.listarNovoId(collectionCliente);

    let novoCliente = data;
    novoCliente.clienteId = novoClienteId;

    await db.insertOne(collectionCliente, novoCliente);
    const novoSaldoId = counterDB.listarNovoId(collectionSaldo);

    const novoSaldo = {
      clienteId: novoClienteId,
      quantidade: 0,
      saldoId: novoSaldoId,
    };
    novoCliente.saldo = 0;

    await db.insertOne(collectionSaldo, novoSaldo);
    return novoCliente;
  } catch (error) {
    throw new Error(`Erro ao tentar listar cliente por ID: ${error.message}`);
  }
};

const listarPorId = async (id) => {
  try {
    let cliente = await db.findOne(collectionCliente, {
      clienteId: Number(id),
    });
    const saldoData = await db.findOne(collectionSaldo, {
      clienteId: Number(id),
    });
    let saldo = 0;

    if (!cliente) {
      throw new Error(`Cliente não encontrado`);
    }
    if (saldoData) {
      saldo = saldoData.quantidade;
    }
    cliente.saldo = saldo;
    return cliente;
  } catch (error) {
    throw new Error(`Erro ao tentar listar cliente por ID: ${error.message}`);
  }
};

module.exports = {
  criar,
  listarPorId,
};
