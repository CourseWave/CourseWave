const express = require("express");
const purchasesController = require("../controllers/purchasesController");
const verify = require("../middlewares/verify");
const router = express.Router();

router.post(
  "/checkout",
  verify.authorize,
  purchasesController.checkoutAndSavePurchases
);
router.get(
  "/getUserCourses",
  verify.authorize,
  purchasesController.getPurchasedCoursesByUser
);

router.get(
  "/getAllUserCourses",
  verify.authorize,
  purchasesController.getPurchasedCourses
);

module.exports = router;
