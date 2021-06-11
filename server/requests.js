const jwt = require("jsonwebtoken");
const crypt = require("bcrypt");

const generateSalt = (gen = 10) => crypt.genSaltSync(gen);
const hashPassword = (password, salt) => crypt.hashSync(password, salt);
const createToken = item => jwt.sign({ item }, "MySuP3R_z3kr3t", { expiresIn: "6h" });

function createAccount(login, password, email, token, salt) {
  return { login, password, email, token, salt, superUser: false };
};

function requests(app, parser, collections) {
  const { users, messages, works } = collections;

  // регистрация аккаунта
  app.post("/api/users/add", parser, (req, res) => {
    const { login, password, email } = req.body;
    const salt = generateSalt();
    const hashingPassword = hashPassword(password, salt);
    const token = createToken(req.body);
    const account = createAccount(login, hashingPassword, email, token, salt);

    users.find({ login, email }).toArray((error, docs) => {
      if (!docs.length > 0) {
        res.status(200).send({ ok: true, status: 200, detail: "Accepted code send on email" });
      } else res.status(400).send({ ok: false, status: 400, detail: "Account is already registered" });
    });
  });
};

module.exports = requests;
