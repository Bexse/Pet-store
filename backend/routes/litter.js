const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

const litterController = require("../controllers/litter");
const userController = require("../controllers/user");

router.get("/", userController.middleware, litterController.getAllLitters); 

router.get("/:id", userController.middleware, litterController.getLitterById); 
router.post("/", userController.middleware, litterController.addLitter); 
router.put(
  "/:id",
  userController.middleware,

  litterController.updateLitterById
);

router.put(
  "/request/:id",

  userController.middleware,
  litterController.requestManageById
);

router.put(
  "/adopted/:id",

  userController.middleware,
  litterController.markasAdoptedById
);

router.delete(
  "/:id",
  userController.middleware,

  litterController.deleteLitterById
); 

module.exports = router;
