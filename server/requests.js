const jwt = require("jsonwebtoken");
const crypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { user, pass } = require("./mailerConfig.js");

const generateSalt = (gen = 10) => crypt.genSaltSync(gen);
const hashPassword = (password, salt) => crypt.hashSync(password, salt);
const createToken = item => jwt.sign({ item }, "MySuP3R_z3kr3t", { expiresIn: "6h" });
const send = (res, detail = "", status = 200) => res.status(status).send({ ok: status >= 200 & status < 300 ? true : false, status, detail });

const createCode = () => {
  let code = `${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`;
  return code;
};

function createAccount(login, password, email, token, salt) {
  return { login, password, email, token, salt, superUser: false, confirm: false, authorization: false };
};

async function sendEmail(transporter, object) {
  const { from, to, subject, text, html } = object;
  let result = await transporter.sendMail({ from, to, subject, text, html });
};

async function requests(app, parser, collections) {
  const { users, messages, works } = collections;

  // smtp транспортер
  const emailer = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
  });

  // регистрация аккаунта
  app.post("/api/users/add", parser, (req, res) => {
    const { login, password, email } = req.body;
    const salt = generateSalt();
    const hashingPassword = hashPassword(password, salt);
    const token = createToken(req.body);
    const account = createAccount(login, hashingPassword, email, token, salt);
    const code = createCode();

    users.find({ login, email }).toArray((error, result) => {
      if (!result.length > 0) {
        let text = `Для подтверждения вам осталось лишь ввести данный код в поле на сайте: ${code}. Не в коем случае не выходите из окна ввода.`;
        sendEmail(emailer, {
          from: user,
          to: `${email}`,
          subject: "Подтвердите регистрацию на PersonalSite",
          text,
          html: `
            <h3>Подтвердите регистрацию на PersonalSite</h3>
            <p>${text}</p>
          `
        });
        users.insertOne(account);
        send(res, { code, token }, 201);
      } else send(res, "Account is already registered", 409);
    });

    app.post("/api/users/confirm-email", parser, (req, res) => {
      const { token } = req.body;
      users.find({ token }).toArray((error, result) => {
        if (result.length > 0) {
          const { login, email, password, superUser, authorization, salt, token } = result[0];
          users.update({ token }, { login, email, password, superUser, authorization, salt, token, confirm: true }, { upsert: false });
          send(res, "Email is confirmed");
          sendEmail(emailer, {
            from: user,
            to: `${email}`,
            subject: "Поздравляем! Регистрация подтверждена!",
            text: "Мы поздравляем вас с регистрацией, в данный момент вы уже можете авторизоваться в своём аккаунте",
            html: "<p>Мы поздравляем вас с регистрацией, в данный момент вы уже можете авторизоваться в своём аккаунте</p>"
          });
        } else send(res, "Email is not confirmed", 400);
      });
    });
  });
};

module.exports = requests;
