const Sauce = require("../models/Sauce");
const fs = require("fs");

/////////////////////////////////////////////////////////////
//              Afficher toutes les sauces                 //
/////////////////////////////////////////////////////////////

exports.findAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////
//                  Afficher une sauce                     //
/////////////////////////////////////////////////////////////

exports.findOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////
//              Créer une nouvelle sauce                   //
/////////////////////////////////////////////////////////////

exports.createSauce = (req, res, next) => {
  const newSauceObject = JSON.parse(req.body.sauce);
  delete newSauceObject.userId;
  const newSauce = new Sauce({
    ...newSauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  newSauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce créée avec succès" });
    })
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////
//                   Modifier une sauce                    //
/////////////////////////////////////////////////////////////

exports.modifySauce = (req, res, next) => {
  const modifiedSauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete modifiedSauceObject.userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Action non-autorisée" });
      } else {
        // Supprimer l'ancienne image si une nouvelle est envoyée
        if (req.file) {
          const filename = sauce.imageUrl.split("/images/")[1];
          console.log(filename);
          fs.unlink(`images/${filename}`, () => {});
        }
        Sauce.updateOne(
          { _id: req.params.id },
          { ...modifiedSauceObject, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Sauce mise à jour avec sucès" })
          )
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////
//                   Supprimer une sauce                   //
/////////////////////////////////////////////////////////////

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Action non-autorisée" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce supprimée avec succès" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

/////////////////////////////////////////////////////////////
//                    Liker une sauce                      //
/////////////////////////////////////////////////////////////

exports.likeSauce = (req, res, next) => {
  res.status(200);
};
