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
      if (err) {
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

  const cardBandeira = req.body.cardBandeira;

  const validade = cardExpMM + "/" + cardExpYY;

  const cardLimite = req.body.cardLimite;
  const cvc = req.body.cvc;

  db.query(
    "SELECT * FROM cartoes WHERE cartoesNumero = ?",
    [cardNumber],
    (err, result) => {
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
            cartoesBandeira: result[0].cartoesBandeira,
            cartoesValoratual: result[0].cartoesValoratual,
            cvc: result[0].cartoesCodigo,
          },
        });
      } else {
        db.query(
          "INSERT INTO cartoes (cartoesUser, cartoesNome,cartoesNumero, cartoesTipo, cartoesValidade,cartoesBandeira, cartoesLimite,cartoesValoratual, cartoesCodigo) VALUES (?,?,?,?,?,?,?,?,?)",
          [id, cardName, cardNumber, cardTipo, validade, cardBandeira,cardLimite,0, cvc],
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
                cartoesBandeira: cardBandeira,
                cartoesValoratual: 0,
                cvc: cvc,
              },
            });
          }
        );
      }
    }
  );
});


//fazer um update que muda somente o cardValoratual do cartao, que vai ser usado quando eu adicionar uma nova despesa com aquele cartao;





router.post("/:id", async (req, res) => {
  const id = req.body.id;
  const idCartao = req.body.cartoesUser;
  const cardNumber = req.body.cartoesNumero;
  const cardName = req.body.cartoesNome;
  const cardTipo = req.body.cartoesTipo;
  const cardExpMM = req.body.cardExpMM;
  const cardExpYY = req.body.cardExpYY;

  const cardBandeira = req.body.cartoesBandeira;
  const cardValoratual = req.body.cartoesValoratual;

  const validade = cardExpMM + "/" + cardExpYY;

  const cardLimite = req.body.cartoesLimite;
  const cvc = req.body.cartoesCodigo;

  db.query("SELECT * FROM cartoes WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
      db.query(
        "UPDATE cartoes SET `cartoesUser` = ?, `cartoesNome` = ?, `cartoesNumero` = ?, `cartoesTipo` = ?, `cartoesValidade` = ?, `cartoesBandeira` = ?, `cartoesLimite` = ?,`cartoesValoratual` = ?, `cartoesCodigo` = ? WHERE `id` = ?",
        [
          idCartao,
          cardName,
          cardNumber,
          cardTipo,
          validade,
          cardBandeira,
          cardLimite,
          cardValoratual,
          cvc,
          id,
        ],

        (err, result) => {
          if (err) {
            res.send(err);
          }
          res.send({
            msg: "Cartão atualizado com Sucesso",
            cartoes: {
              id: id,
              cartoesUser: idCartao,
              cartoesNumero: cardNumber,
              cartoesNome: cardName,
              cartoesTipo: cardTipo,
              cartoesValidade: validade,
              cartoesBandeira: cardBandeira,
              cartoesLimite: cardLimite,
              cartoesValoratual: cardValoratual,
              cvc: cvc,
            },
          });
        }
      );
    }
  });
});

/* delete cartao */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM cartoes WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query("DELETE FROM cartoes WHERE id = ?", [id], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ msg: "Cartão deletado com Sucesso" });
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
