const express = require("express")

const {
  getInterns,
  getIntern,
  createIntern,
  deleteIntern,
  updateIntern,
} = require("../controllers/internController")

const router = express.Router()

router.get("/", getInterns)

router.get("/:id", getIntern)

router.post("/", createIntern)

router.delete("/:id", deleteIntern)

router.patch("/:id", updateIntern)

module.exports = router
