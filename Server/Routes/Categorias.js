const express = require("express");
const mysql = require("mysql2");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "solf1",
});

router.get("/getCategorias/:id", async (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM categorias WHERE idUser = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }

    const categoria = result;
    res.status(200).send(categoria);
  });
});

router.post("/", async (req, res) => {
  const idUser = req.body.idUser;
  const nome = req.body.nome;
  const titulo = req.body.titulo;
  const cor = req.body.cor;
  const expense = req.body.expense;

  db.query(
    "INSERT INTO categorias (idUser, nome,titulo, cor, expense) VALUES (?,?,?,?,?)",
    [idUser, nome, titulo, cor, expense],
    (error, result) => {
      if (error) {
        console.log(error);
        res.send(error);
      }

      console.log(result);

      res.send({
        msg: "Categoria cadastrada com sucesso!",
        categoria: {
          id: result.insertId,
          idUser: idUser,
          nome: nome,
          titulo: titulo,
          cor: cor,
          expense: expense,
        },
      });
    }
  );
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM categorias WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        db.query(
          "SELECT * FROM transacoes WHERE categoria = ?",
          [result[0].titulo],
          (err, result2) => {
            if (err) {
              res.send(err);
            }
            if (result2.length > 0) {
              res.send({
                msg: "Não é possível deletar uma categoria com transações!",
              });
            } else {
              db.query(
                "DELETE FROM categorias WHERE id = ?",
                [id],
                (err, result3) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send({ msg: "Categoria deletada com Sucesso" });
                  }
                }
              );
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/:id", async (req, res) => {
  const id = req.body.id;
  const idUser = req.body.idUser;
  const nome = req.body.nome;
  const titulo = req.body.titulo;
  const cor = req.body.cor;
  const expense = req.body.expense;

  db.query("SELECT * FROM categorias WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      db.query(
        "SELECT * FROM transacoes WHERE categoria = ?",
        [result[0].titulo],
        (err, result2) => {
          if (err) {
            res.send(err);
          }
          if (result2.length > 0) {
            res.send({
              msg: "Não é possível editar uma categoria com transações!",
            });
          } else {
            db.query(
              "SELECT * FROM categorias WHERE id = ?",
              [id],
              (err, result) => {
                if (err) {
                  res.send(err);
                }

                if (result.length > 0) {
                  db.query(
                    "UPDATE categorias SET `nome` = ?, `titulo` = ?, `cor` = ?, `expense` = ? WHERE `id` = ?",
                    [nome, titulo, cor, expense, id],

                    (err, result) => {
                      if (err) {
                        res.send(err);
                      }
                      res.send({
                        msg: "Categoria atualizada com Sucesso",
                        categoria: {
                          id: id,
                          idUser: idUser,
                          nome: nome,
                          titulo: titulo,
                          cor: cor,
                          expense: expense,
                        },
                      });
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

module.exports = router;
