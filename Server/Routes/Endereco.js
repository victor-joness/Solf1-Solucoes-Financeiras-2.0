const express = require("express");
const mysql = require("mysql2");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "solf1",
});

router.get("/getEndereco/:id", async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM endereco WHERE idUsuario = ?",
    [id],
    (err, result) => {
      if(err) {
        console.log(err);
      }

      const endereco = result;
      res.status(200).send(endereco);
    }
  );
});

router.put("/", async (req, res) => {


  const id = req.body.id;
  const cidade = req.body.cidade;
  const estado = req.body.estado;
  const cep = req.body.cep;
  const numero = req.body.numero;
  const bairro = req.body.bairro;

  db.query("SELECT * FROM endereco WHERE idUsuario = ?", [id], (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
      db.query(
        "UPDATE endereco SET estado = ?, cidade = ?, cep = ?, bairro = ?, numero = ? WHERE id = ?",
        [estado, cidade, cep, bairro, numero, result[0].id],
        (error, result) => {
          if (error) {
            res.send(error);
          }

          res.send({
            msg: "Endereço atualizado com sucesso!",
            endereco: {
              id: id,
              estado: estado,
              cidade: cidade,
              cep: cep,
              bairro: bairro,
              numero: numero,
            },
          });
        }
      );
    } else {
      db.query(
        "INSERT INTO endereco (idUsuario, estado, cidade, cep, bairro, numero) VALUES (?,?,?,?,?,?)",
        [id, estado, cidade, cep, bairro, numero],
        (error, result) => {
          if (error) {
            res.send(error);
          }

          res.send({
            msg: "Endereço cadastrado com sucesso!",
            endereco: {
              id: id,
              estado: estado,
              cidade: cidade,
              cep: cep,
              bairro: bairro,
              numero: numero,
            },
          });
        }
      );
    }
  });
});

module.exports = router;
