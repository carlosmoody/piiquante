const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10;

  if (!validator.isEmail(email)) {
    res.status(400).json({ message: "Erreur de saisie de l'e-mail" });
  } else {
    bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
      .save()
      .then(() =>
      res.status(201).json({ message: "Utilisateur créé avec succès" })
      )
      .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Erreur d'authentification" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Erreur d'authentification" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
