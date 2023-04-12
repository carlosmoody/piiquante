const express = require("express");
const multer = require("../middleware/multer");
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");
const authorize = require("../middleware/authorize");

router.get("/", authorize, sauceCtrl.findAllSauces);
router.get("/:id", authorize, sauceCtrl.findOneSauce);
router.post("/", authorize, multer, sauceCtrl.createSauce);
router.put("/:id", authorize, multer, sauceCtrl.modifySauce);
router.delete("/:id", authorize, sauceCtrl.deleteSauce);
router.post("/:id/like", );

module.exports = router;