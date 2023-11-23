const { MongoClient } = require("mongodb");

const url = "mongodb://admin:admin@db:27017/db1"
const database = "db1";

let singleton;

async function connect() {
  try {
    if (singleton) return singleton;
    const client = new MongoClient(url);
    await client.connect();
    singleton = client.db(database);
    return singleton;
  } catch (error) {
    console.error(error);
  }
}

const findOne = async (collection, options) => {
  try {
    const db = await connect();
    const result = await db.collection(collection).find(options).toArray();
    if (result.length) {
      return result[0];
    }
    return null;
  } catch (error) {
    throw new Error(`Erro ao tentar fazer findOne: ${error.message}`);
  }
};

const findAll = async (collection, options) => {
  try {
    db = await connect();
    return await db
      .collection(collection)
      .find(options ? options : {})
      .toArray();
  } catch (error) {
    throw new Error(`Erro ao tentar fazer findAdd: ${error.message}`);
  }
};

const insertOne = async (collection, data) => {
  try {
    db = await connect();
    return await db.collection(collection).insertOne(data);
  } catch (error) {
    throw new Error(`Erro ao tentar fazer insertOne: ${error.message}`);
  }
};

const insertMany = async (collection, datas) => {
  try {
    db = await connect();
    return await db.collection(collection).insertMany(datas);
  } catch (error) {
    throw new Error(`Erro ao tentar fazer insertMany: ${error.message}`);
  }
};

const updateOne = async (collection, data, where) => {
  try {
    db = await connect();
    return await db.collection(collection).updateOne(where, { $set: data });
  } catch (error) {
    throw new Error(`Erro ao tentar fazer updateOne: ${error.message}`);
  }
};

module.exports = {
  findAll,
  findOne,
  insertOne,
  insertMany,
  updateOne,
};
