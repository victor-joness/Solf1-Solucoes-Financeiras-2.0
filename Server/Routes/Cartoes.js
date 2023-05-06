const express = require("express");
const mysql = require("mysql2");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "solf1",
});

router.get("/getCartoes/:id", async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM cartoes WHERE cartoesUser = ?",
    [id],
    (err, result) => {
      if(err) {
        console.log(err);
      }

      const cartoes = result;
      res.status(200).send(cartoes);
    }
  );
});

router.post("/", async (req, res) => {

    const id = req.body.cartoesUser;
    const cardNumber = req.body.cardNumber;
    const cardName = req.body.cardName;
    const cardTipo = req.body.cardTipo;
    const cardExpMM = req.body.cardExpMM;
    const cardExpYY = req.body.cardExpYY;

    const validade = cardExpMM + "/" + cardExpYY;

    const cardLimite = req.body.cardLimite;
    const cvc = req.body.cvc;

  db.query("SELECT * FROM cartoes WHERE cartoesNumero = ?", [cardNumber], (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
        res.send({
            msg: "Já Existe um cartão com esse número!",
            cartoes: {
                cartoesNumero: result[0].cartoesNumero,
                cartoesNome: result[0].cartoesNome,
                cartoesTipo: result[0].cartoesTipo,
                cartoesValidade: result[0].cartoesValidade,
                cartoesLimite: result[0].cartoesLimite,
                cvc: result[0].cartoesCodigo,
            },
          });
    } else {
      db.query(
        "INSERT INTO cartoes (cartoesUser, cartoesNome,cartoesNumero, cartoesTipo, cartoesValidade, cartoesLimite, cartoesCodigo) VALUES (?,?,?,?,?,?,?)",
        [id, cardName, cardNumber, cardTipo, validade, cardLimite, cvc],
        (error, result) => {
          if (error) {
            res.send(error);
          }

          res.send({
            msg: "Cartão cadastrado com sucesso!",
            cartoes: {
                id: result.insertId,
                cartoesUser: id,
                cartoesNumero: cardNumber,
                cartoesNome: cardName,
                cartoesTipo: cardTipo,
                cartoesValidade: validade,
                cartoesLimite: cardLimite,
                cvc: cvc,
            },
          });
        }
      );
    }
  });
});

module.exports = router;