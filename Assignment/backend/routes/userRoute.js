const express = require('express');
const { registerUser, loginUser,
    logOut, forgotPassword,resetPassword,updatePassword, getUserDetails, getAllUsers } = require("../controllers/userController");
const { isAuthenticatedEmployee, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logOut);
router.route("/getUserDetails").get(getUserDetails);
router.route("/getAllUsers").get(getAllUsers);
router.route("/password/update").put(/*isAuthenticatedEmployee,*/ updatePassword);
getAllUsers
module.exports = router;
