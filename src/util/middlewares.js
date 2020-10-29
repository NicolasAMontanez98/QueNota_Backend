const jwt = require("jsonwebtoken");
const Busboy = require("busboy");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formData = (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });

  req.body = {};

  busboy.on("field", (key, val) => {
    req.body[key] = val;
  });

  busboy.on("file", (key, file) => {
    const stream = cloudinary.uploader.upload_stream(
      { upload_preset: "quenotadir" },
      (err, res) => {
        console.log(err);
        if (err) throw "Algo salió mal";

        req.body[key] = res;
        next();
      }
    );

    file.on("data", (data) => {
      stream.write(data);
    });

    file.on("end", () => {
      stream.end();
    });
  });
  req.pipe(busboy);
};

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

module.exports = { formData, getToken, isAuth };
