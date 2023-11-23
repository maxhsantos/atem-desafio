const transacaoDB = require("../database/transacaoDB");

const criar = async (req, res) => {
  try {
    const { id } = req.params;
    const { valor, tipo } = req.body;

    if (typeof valor != "number" || !id || !tipo) {
      throw new Error("Falta de parâmetros obrigatórios!");
    }
    const data = {
      clienteId: Number(id),
      quantidade: valor,
      tipo,
    };
    await transacaoDB.criar(data);
    return res.status(201).json({
      status: "success",
      message: "Sucesso ao criar transação",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message || "Ocorreu algum erro",
    });
  }
};

const listarSaldoId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Falta de parâmetro obrigatório!");
    }

    const saldo = await transacaoDB.listarSaldoId(id);
    return res.status(200).json({
      status: "success",
      message: "Sucesso ao listar saldo do cliente",
      data: {
        saldo: saldo,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Ocorreu algum erro",
      err: err.message,
    });
  }
};

module.exports = {
  criar,
  listarSaldoId,
};
