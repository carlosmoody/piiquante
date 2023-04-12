const Sauce = require("../models/Sauce");

exports.findAllSauces = (req, res, next) => {
  res.status(200).json({ message: "Sauces trouvées"});
};

exports.findOneSauce = (req, res, next) => {
  res.status(200).json({ message: "Sauce trouvée"});
};