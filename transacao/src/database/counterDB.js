const db = require("./dbConnection");
const collectionCounter = "counter";

const listarNovoId = async (field) => {
  try {
    let collection = await db.findOne(collectionCounter, {
      field: field,
    });

    if (!collection) {
      await db.insertOne(collectionCounter, { field: field, lastId: 0 });
      collection = await db.findOne(collectionCounter, {
        field: field,
      });
    }

    const novoId = Number(collection.lastId) + 1;
    await db.updateOne(collectionCounter, { lastId: novoId }, { field: field });

    return novoId;
  } catch (error) {
    throw new Error(`Erro ao tentar listar novo counter Id: ${error.message}`);
  }
};

module.exports = {
  listarNovoId,
};
