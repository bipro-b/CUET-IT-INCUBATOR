const express = require("express");
const companyController = require("../controllers/companyController")
const router = express.Router()

router.route("/bulk-update").put(companyController.bulkUpdateCompany);
router.route("/bulk-delete").delete(companyController.bulkDeleteCompany)

router.route("/")
.post(companyController.createCompany)
.get(companyController.getCompany)


router.route("/:id")
.get(companyController.getCompanyById)
.put(companyController.updateCompanyById)
.delete(companyController.deleteCompanyById)

module.exports = router;