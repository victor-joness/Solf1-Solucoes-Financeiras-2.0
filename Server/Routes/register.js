const bcript = require("bcrypt");
const express = require("express");
const genAuthToken = require("../Utils/genAuthToken");
const mysql = require("mysql2");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "solf1",
});

const saltRounds = 10;

db.connect();

router.post("/", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const celular = req.body.celular;
  const endereco = req.body.endereco;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const Img = req.body.Img;

  let image = "";

  if(Img == ""){
    image = "AVATAR-USER.png"
  }else{
    image = Img;
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length == 0) {
      bcript.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (name, email,celular, endereco, password, isAdmin, Img) VALUE (?,?,?,?,?,?,?)",
          [name, email, celular, endereco, hash, isAdmin, image],
          (error, response) => {
            if (err) {
              res.send(err);
            }
            res.send({
              msg: "Usuário cadastrado com sucesso",
              user: {
                id: response.insertId,
                name: name,
                email: email,
                celular: celular,
                endereco: endereco,
                isAdmin: isAdmin,
                Img: Img,
              },
              token: genAuthToken({
                id: response.insertId,
                name: name,
                email: email,
                celular: celular,
                endereco: endereco,
                isAdmin: isAdmin,
                Img: Img,
              }),
            });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

module.exports = router;
