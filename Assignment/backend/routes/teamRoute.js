const express = require('express');
const {addUsersToTeam,createTeam, getAllUniqueTeamNames } = require("../controllers/teamController");
const { isAuthenticatedEmployee, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/createTeam").post(createTeam);
router.route("/addUsersToTeam").post(addUsersToTeam);
router.route("/getAllTeams").get(getAllUniqueTeamNames);
module.exports = router;
