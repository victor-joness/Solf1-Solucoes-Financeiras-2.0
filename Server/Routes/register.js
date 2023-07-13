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

  if (Img == "") {
    image = "AVATAR-USER.png";
  } else {
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
            }else{
              db.query(
                "INSERT INTO endereco (idUsuario, estado, cidade, cep, bairro, numero) VALUES (?,?,?,?,?,?)",
                [response.insertId, '', '', '', '', ''],
                (error, result) => {
                  if (error) {
                    res.send(error);
                  }
                }
              );
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

router.put("/updateUser", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const celular = req.body.celular;
  const password = req.body.password;
  const Img = req.body.Img;

  if (password) {
    db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err2, result2) => {
      if (err2) {
        res.send(err2);
      }
      bcript.hash(password, saltRounds, (err, hash) => {
        db.query(
          "UPDATE usuarios SET name = ?, email = ? ,celular = ?,password = ?, Img = ? WHERE id = ?",
          [name, email, celular, hash, Img, id],
          (error, response) => {
            if (error) {
              res.send(error);
            }
            res.send({
              msg: "mudaça feita com sucesso",
              user: {
                id: id,
                name: name,
                email: email,
                celular: celular,
                isAdmin: result2[0].isAdmin,
                Img: Img,
              },
              token: genAuthToken({
                id: id,
                name: name,
                email: email,
                celular: celular,
                isAdmin: result2[0].isAdmin,
                Img: Img,
              }),
            });
          }
        );
      });
    });
  } else {
    db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err2, result2) => {
      if (err2) {
        res.send(err2);
      }

      db.query(
        "UPDATE usuarios SET name = ?, email = ? ,celular = ?, Img = ? WHERE id = ?",
        [name, email, celular, Img, id],
        (error, response) => {
          if (error) {
            res.send(error);
          }

          res.send({
            msg: "mudaça feita com sucesso",
            user: {
              id: id,
              name: name,
              email: email,
              celular: celular,
              isAdmin: result2[0].isAdmin,
              Img: Img,
            },
            token: genAuthToken({
              id: id,
              name: name,
              email: email,
              celular: celular,
              isAdmin: result2[0].isAdmin,
              Img: Img,
            }),
          });
        }
      );
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        db.query("DELETE FROM endereco WHERE idUsuario = ?", [id], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            db.query("DELETE FROM transacoes WHERE idUser = ?", [id], (err, result) => {
              if (err) {
                res.send(err);
              } else {
                db.query("DELETE FROM cartoes WHERE cartoesUser = ?", [id], (err, result) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send({ msg: "User deletado com Sucesso" });
                  }
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


module.exports = router;
