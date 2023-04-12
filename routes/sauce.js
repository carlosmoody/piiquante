const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

router.get("/", sauceCtrl.findAllSauces);
router.get("/:id", sauceCtrl.findOneSauce);
router.post("/", );
router.put("/:id", );
router.delete("/:id", );
router.post("/:id/like", );

module.exports = router;