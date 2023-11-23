const clienteDB = require("../database/clienteDB");

const criar = async (req, res) => {
  const { nome, telefone } = req.body;
  try {
    if (!nome || !telefone) {
      throw new Error("Falta de parâmetros obrigatórios!");
    }
    await clienteDB.criar(req.body);
    return res.status(201).json({
      status: "success",
      message: "Sucesso ao criar cliente",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message || "Ocorreu algum erro",
    });
  }
};

const listarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Falta de parâmetro obrigatório!");
    }
    const result = await clienteDB.listarPorId(id);
    return res.status(200).json({
      status: "success",
      message: "Sucesso ao listar cliente por ID",
      data: result,
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
  listarPorId,
};
