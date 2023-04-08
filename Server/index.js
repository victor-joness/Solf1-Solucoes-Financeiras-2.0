const express = require("express");
const cors = require("cors");
require("dotenv").config();

const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors());

const login = require("./Routes/Login");
const register = require("./Routes/register");

//endpoints
app.use("/api/register", register);
app.use("/api/login", login);

//Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

const port = process.env.PORT || 5005;

app.get("/", (req, res) => {
  res.send("Welcome the api Solf1");
});

app.listen(port, console.log(`server Online na porta ${port}`));
