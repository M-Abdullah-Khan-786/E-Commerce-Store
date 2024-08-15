const express = require("express");
const { createColor, updateColor, deleteColor, singleColor, getAllColor } = require("../controllers/colorController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router
    .post("/create", authMiddleware, isAdmin, createColor)
    .put("/update/:id", authMiddleware, isAdmin, updateColor)
    .delete("/delete/:id", authMiddleware, isAdmin, deleteColor)
    .get("/:id", singleColor)
    .get("/", getAllColor)

module.exports = router;