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
  const { users, messages, works, about } = collections;

  /*////
    AUTH API
  */

  // smtp транспортер
  const emailer = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
  });

  // register account
  app.post("/api/users/add", parser, (req, res) => {
    const { login, password, email } = req.body;
    const salt = generateSalt();
    const hashingPassword = hashPassword(password, salt);
    const token = createToken(req.body);
    const account = createAccount(login, hashingPassword, email, token, salt);
    const code = createCode();

    users.findOne({ login, email }, (error, result) => {
      if (!result) {
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
      } else send(res, "User already register", 409);
    });
  });

  app.post("/api/users/confirm-email", parser, (req, res) => {
    const { token } = req.body;
    users.findOne({ token }, (err, result) => {
      if (result != null) {
        const { login, email, password, superUser, authorization, salt, token } = result;
        users.findOneAndUpdate({ token }, { $set: { login, email, password, superUser, authorization, salt, token, confirm: true }}, (err, result) => {
          send(res, "Email is confirmed");
          sendEmail(emailer, {
            from: user,
            to: `${email}`,
            subject: "Поздравляем! Регистрация подтверждена!",
            text: "Мы поздравляем вас с регистрацией, в данный момент вы уже можете авторизоваться в своём аккаунте",
            html: "<p>Мы поздравляем вас с регистрацией, в данный момент вы уже можете авторизоваться в своём аккаунте</p>"
          });
        });
      } else send(res, "Email is not confirmed", 400);
    });
  });

  // sign
  app.post("/api/users/sign-in", parser, (req, res) => {
    users.findOne({ login: req.body.login }, (err, result) => {
      if (result != null) {
        // деструктуризация всех данных
        const { login, email, password, superUser, authorization, salt, token, confirm } = result;

        // хеширование полученного пароля
        const candidatePassword = hashPassword(req.body.password, salt);

        // если пароль совпадает полученному паролю а так же аккаунта подтвержден
        if (password == candidatePassword & confirm) {

          // сгенерировать новый токен для аккаунта и сохранить его а так же вернуть ответ клиенту о успешной авторизации в виде токена
          const newToken = createToken({ login, email, password });
          users.findOneAndUpdate({ login }, { $set: { login, email, password, superUser, authorization, salt, confirm, token: newToken, authorization: true }}, (error, result) => {
            send(res, { token: newToken }, 200);
          });

          // если данные оказались не корректны
        } else send(res, "Data is not correct", 400);
        // если такого аккаунта и во все не существует
      } else send(res, "Account is not register", 400)
    });
  });

  app.get("/api/users/get-level-access", parser, (req, res) => {
    const { token } = req.query;
    users.findOne({ token }, (err, result) => {
      if (result != null) {
        if (result.superUser) send(res, "User is super user");
        else send(res, "User is not super user", 400);
      };
    });
  });

  app.get("/api/users/get-authorization", parser, (req, res) => {
    const { token } = req.query;
    users.findOne({ token }, (error, result) => {
      if (result != null) {
        send(res, { authorization: result.authorization }, 200);
      } else send(res, "Data is null", 400);
    });
  });

  app.get("/api/users/un-auth", parser, (req, res) => {
    const { token } = req.query;
    users.findOne({ token }, (err, result) => {
      const { login, email, password, superUser, authorization, salt, token, confirm } = result;
      if (result != null) {
        users.updateOne({ token }, { $set: { authorization: false }}, (error, result) => {});
        send(res, "User is un-auth");
      } else send(res, "User is not un-auth", 400);
    });
  });

  /*////////
    MESSAGES API
  */

  app.post("/api/messages/send-message", parser, (req, res) => messages.insertOne(req.body));
  app.get("/api/messages/get-messages", parser, (req, res) => messages.find().toArray((err, result) => send(res, result)));
  app.delete("/api/messages/delete-message", parser, (req, res) => {
    const { message } = req.query;
    messages.remove({ message });
    send(res, "Message is delete");
  });

  /*/////
    ABOUT API
  */
  app.get("/api/about/get-text", parser, (req, res) => about.find().toArray((err, result) => {
    if (result[0] != undefined)  send(res, result[0])
  }));
  app.put("/api/about/put-text", parser, (req, res) => {
    const { text } = req.body;
    about.find().toArray((err, result) => {
      about.updateOne({ text: result[0].text }, { $set: { text }}, (err, result) => {});
    });
  });

  /*///
    USERS API
  */
  app.get("/api/users/get-all-users", parser, (req, res) => users.find().toArray((err, result) => send(res, result)));

  /*///
    WORKS API
  */
  app.get("/api/works/get-works", parser, (req, res) => works.find().toArray((err, result) => send(res, result)));

  app.get("/api/works/get-works-by-id", parser, (req, res) => {
    const { id } = req.query;
    works.findOne({ _id: id }, (err, result) => {
      if (!err) send(res, result);
    });
  });

  app.post("/api/works/post-works", parser, (req, res) => {
    const { titlePhoto, photos, name, about, gitHubLink, hostingLink } = req.body;
    works.insertOne({
      titlePhoto, photos, name, about, gitHubLink, hostingLink, likes: 0
    });
    send(res, "Work is added", 209);
  });

  app.put("/api/works/put-works", parser, (req, res) => {
    const { id } = req.query;
  });

  app.delete("/api/works/delete-works", parser, (req, res) => {
    const { id } = req.query;
    works.remove({ _id: id });
    send(res, "Work is delete");
  });
};

module.exports = requests;
