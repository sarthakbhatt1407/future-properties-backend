const express = require("express");
const router = express.Router();
const propertyController = require("../controller/propertyController");
const fileUpload = require("../middleware/fileUpload");

router.post("/get-property-by-id", propertyController.getPropertyById);
router.get("/get-all-properties", propertyController.getAllProperties);
router.get("/all-properties-admin", propertyController.getAllPropertiesAdmin);
router.post("/get-property-by-userId", propertyController.getPropertyByUserId);
router.post("/get-property-by-city", propertyController.getPropertyByCity);
router.post("/update-property", propertyController.updatePropertyStatus);
router.post(
  "/get-property-by-subcategory",
  propertyController.getPropertyBySubCategory
);
router.post(
  "/create-new-property",
  fileUpload.array("image"),
  propertyController.createProperty
);

module.exports = router;
