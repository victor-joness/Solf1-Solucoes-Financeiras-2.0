const express = require("express");
const mysql = require("mysql2");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "solf1",
});

router.get("/getTransacoes/:id", async (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM transacoes WHERE idUser = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }

    const transacoes = result;
    res.status(200).send(transacoes);
  });
});

router.post("/", async (req, res) => {
  const idUser = req.body.idUser;
  const cartao = req.body.cartao;

  const data = req.body.date;
  const titulo = req.body.title;
  const valor = req.body.value;
  const categoria = req.body.category;

  let expense = false;

  if (categoria == "food") {
    expense = true;
  } else if (categoria == "rent") {
    expense = true;
  } else if (categoria == "cloats") {
    expense = true;
  } else if (categoria == "salary") {
    expense = false;
  } else if (categoria == "tax") {
    expense = true;
  } else if (categoria == "profit") {
    expense = false;
  } else if (categoria == "velhice") {
    expense = true;
  } else if (categoria == "investments") {
    expense = true;
  } else if (categoria == "services") {
    expense = true;
  } else if (categoria == "others") {
    expense = true;
  }

  db.query(
    "INSERT INTO transacoes (idUser, titulo,categoria, valor, expense, data, cartao) VALUES (?,?,?,?,?,?,?)",
    [idUser, titulo, categoria, valor, expense, data, cartao],
    (error, result) => {
      if (error) {
        res.send(error);
      }

      res.send({
        msg: "Transação cadastrada com sucesso!",
        transacao: {
          id: result.insertId,
          idUser: idUser,
          cartao: cartao,
          data: data,
          titulo: titulo,
          valor: valor,
          expense: expense,
          categoria: categoria,
        },
      });
    }
  );
});

//fazer um update que muda somente o cardValoratual do cartao, que vai ser usado quando eu adicionar uma nova despesa com aquele cartao;
router.put("/", async (req, res) => {
  const id = req.body.cartao.split(",")[0];
  const valor2 = req.body.value;

  db.query("SELECT * FROM cartoes WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send(err);
    }

    let valor = result[0].cartoesValoratual + valor2;

    if (valor > result[0].cartoesLimite) {
      res.send({
        msg: "Limite do cartão excedido!",
      });
    } else {
      db.query(
        "UPDATE cartoes SET cartoesValoratual = ? WHERE id = ?",
        [valor, id],
        (error, result) => {
          if (error) {
            res.send(error);
          }

          res.send({
            msg: "Valor atualizado com sucesso!",
          });
        }
      );
    }
  });
});

router.post("/:id", async (req, res) => {
  const id = req.body.id;
  const idUser = req.body.idUser;
  const valor = req.body.valor;
  const titulo = req.body.titulo;
  const data = req.body.data;
  const expense = req.body.expense;
  const categoria = req.body.categoria;
  const cartao = req.body.cartao;

  const idCartao = cartao[0] + cartao[1];

  db.query(
    "UPDATE transacoes SET `titulo` = ?, `categoria` = ?, `valor` = ?, `expense` = ?, `data` = ?, `cartao` = ? WHERE `id` = ?",
    [titulo, categoria, valor, expense, data, cartao, id],

    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send({
        msg: "Transação atualizada com Sucesso",
        transacao: {
          id: id,
          idUser: idUser,
          valor: valor,
          titulo: titulo,
          data: data,
          expense: expense,
          categoria: categoria,
          cartao: cartao,
        },
      });
    }
  );

  db.query(
    "SELECT * FROM transacoes WHERE idUser = ?",
    [idUser],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      let valor = 0;

      arr = result.filter((transacao) => {
        if (
          (transacao.cartao[0] == idCartao[0] &&
            transacao.cartao[1] == idCartao[1]) == true
        ) {
          return transacao;
        }
      });

      arr.map((transacao) => {
        if (transacao.expense == 1) {
          valor += transacao.valor;
        } else {
          valor -= transacao.valor;
        }
      });

      db.query(
        "UPDATE cartoes SET cartoesValoratual = ? WHERE id = ?",
        [valor, idCartao],
        (err, result) => {
          if (err) {
            res.send(err);
          }
        }
      );
    }
  );
});

/* delete transacao */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM transacoes WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }

      console.log(result[0].cartao);

      if (result[0].cartao != null) {
        let idCartao = result[0].cartao[0] + result[0].cartao[1];

        db.query(
          "SELECT * FROM cartoes WHERE id = ?",
          [idCartao],
          (err, result2) => {
            if (err) {
              res.send(err);
            } else {
              let valor = result2[0].cartoesValoratual - result[0].valor;
              db.query("UPDATE cartoes SET cartoesValoratual = ? WHERE id = ?", [valor, idCartao], (err, result3) => {
                if (err) {
                  res.send(err);
                }else{
                  console.log(result3);
                }
              });
            } 
          }
        );
      }

      if (result.length > 0) {
        db.query("DELETE FROM transacoes WHERE id = ?", [id], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ msg: "Transação deletada com Sucesso" });
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
