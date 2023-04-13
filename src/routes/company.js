const express = require("express");
const companyController = require("../controllers/companyController")
const verifyToken = require("../middleware/verifyToken")
const authorization = require("../middleware/authorization")

const router = express.Router()

router.route("/bulk-update").put(companyController.bulkUpdateCompany);
router.route("/bulk-delete").delete(companyController.bulkDeleteCompany)

router.route("/")
.post(companyController.createCompany)
.get(verifyToken,authorization("admin") ,companyController.getCompany)


router.route("/:id")
.get(companyController.getCompanyById)
.put(companyController.updateCompanyById)
.delete(companyController.deleteCompanyById)

module.exports = router;