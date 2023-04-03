const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const login = require("./Routes/Login");
const register = require("./Routes/register");

//endpoints
app.use("/api/register", register);
app.use("/api/login", login);

const port = process.env.PORT || 5005;

app.get("/", (req, res) => {
  res.send("Welcome the api Solf1");
});

app.listen(port, console.log(`server Online na porta ${port}`));
