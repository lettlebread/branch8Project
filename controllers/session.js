require("module-alias/register");
const { getMongo } = require("@root/utils/mongodb");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, credential } = req.body;
  const u = req.session.user;
  try {
    if (!email || !credential) {
      res.status(400).json({ error: "invalid arguments" });
      return;
    }

    const db = await getMongo();
    let aUser = await db.collection("users").findOne({ email });

    if (!aUser) {
      res.status(401).json({ error: "invalid email or password" });
      return;
    }

    const match = await bcrypt.compare(credential, aUser.credential);

    if (!match) {
      res.status(401).json({ error: "invalid email or password" });
      return;
    }

    req.session.user = { email };

    res.status(200).json({
      message: "login success"
    });
  } catch (e) {
    if (e.code) {
      res.status(e.code).json(e.message);
    } else {
      throw e;
    }
  }
};

exports.login = login;