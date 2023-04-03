const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isDoutor: user.isDoutor,
      isEnfermeira: user.isEnfermeira,
      isPaciente: user.isPaciente,
      Img: user.Img
    },
    secretKey
  );

  return token;
};

module.exports = genAuthToken;