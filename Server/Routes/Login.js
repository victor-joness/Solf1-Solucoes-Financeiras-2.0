const bcript = require("bcrypt");
const express = require("express");
const mysql = require("mysql2");
const genAuthToken = require("../Utils/genAuthToken");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "solf1",
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
      bcript.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({
            msg: "Usuário logado!",
            usuario: {
              id: result[0].id,
              name: result[0].name,
              email: result[0].email,
              celular: result[0].celular,
              endereco: result[0].endereco,
              token: genAuthToken({
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                celular: result[0].celular,
                endereco: result[0].endereco,
                isAdmin: result[0].isAdmin,
                Img: result[0].Img,
              }),
            },
          });
        } else {
          res.send({ msg: "Senha incorreta!" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

module.exports = router;
