const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      names: user.names,
      lastNames: user.lastNames,
      email: user.email,
    },
    process.env.SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Token Invalido" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token no recibido" });
  }
};

module.exports = { getToken, isAuth };
