require("module-alias/register");

const { getMongo } = require("@root/utils/mongodb");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, credential } = req.body;

  try {
    const db = await getMongo();
    let aUser = await db.collection("users").findOne({ email });

    if (aUser) {
      res.status(400).json({ error: "invalid email" });
      return;
    }

    const hash = await bcrypt.hash(credential, 10);

    await db.collection("users").insertOne({
      email,
      credential: hash
    });

    res.status(200).json({
      message: "register success"
    });
  } catch (e) {
    if (e.code) {
      res.status(e.code).json(e.message);
    } else {
      throw e;
    }
  }
};

const userArea = async (req, res) => {
  try {
    res.status(200).json({
      message: "hello world user"
    });
  } catch (e) {
    if (e.code) {
      res.status(e.code).json(e.message);
    } else {
      throw e;
    }
  }
};

exports.register = register;
exports.userArea = userArea;