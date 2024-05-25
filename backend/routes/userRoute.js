const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getAllUsers, getSingleUser, UpdateeUser, deleteUser, blockUser, unBlockUser, handleToken, logoutUser } = require("../controllers/userController")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")

router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/refresh", handleToken)
    .get("/logout", logoutUser)
    .get("/AllUsers", authMiddleware, isAdmin, getAllUsers)
    .get("/:id", getSingleUser)
    .delete("/:id", deleteUser)
    .put("/update", authMiddleware, UpdateeUser)
    .put("/block-user/:id", authMiddleware, isAdmin, blockUser)
    .put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)



module.exports = router