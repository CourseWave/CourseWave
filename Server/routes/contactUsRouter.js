const express = require("express");
const contactUsController = require("../controllers/contactUsController");
const router = express.Router();

router.post("/sendMessage", contactUsController.sendMessage);
router.put("/deleteMessage", contactUsController.deleteMessage);
router.get("/getMessages", contactUsController.getMessages);

module.exports = router;
