require("module-alias/register");

const MongoClient = require("mongodb").MongoClient;

var mongodbClient;
var alfDb;

const getMongo = async () => {
  if (typeof alfDb === "undefined") {
    try {
      const mongoClient = await getMongoClient();
      alfDb = mongoClient.db("branch8");
    } catch (err) {
      throw err;
    }
  }

  return alfDb;
};

const getMongoClient = async () => {
  if (typeof mongodbClient === "undefined") {
    try {
      const uri = await getDbUri();
      mongodbClient = await MongoClient.connect(uri, {
        useUnifiedTopology: true,
      });
    } catch (err) {
      throw err;
    }
  }

  return mongodbClient;
};

const getDbUri = async () => {
  const password = await getMongoPassword();

  return `mongodb+srv://lettlebread:${password}@cluster0.isvxs.mongodb.net/?retryWrites=true&w=majority`;
};

const getMongoPassword = () => {
  const pass = eval("require")("@root/dev-keys/mongo-db-password.json");

  return pass.password;
};

exports.getMongo = getMongo;
exports.getMongoClient = getMongoClient;