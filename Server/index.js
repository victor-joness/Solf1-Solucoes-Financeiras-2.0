const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const login = require("./Routes/Login");

app.use("/api/login", login);

const port = process.env.PORT || 5005;

app.listen(port, console.log(`server Online na porta ${port}`));