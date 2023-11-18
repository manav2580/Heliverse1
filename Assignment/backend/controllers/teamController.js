const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Team = require('../models/teamModel');
const User=require('../models/userModel')
const { authorizeRoles } = require('../middleware/auth');
exports.createTeam = catchAsyncErrors(async (req, res, next) => {
    const {teamId,name,Details} = req.body;
    const team = await Team.create({
        teamId,name,Details
    });
    res.status(200).json({
        success: true,
        message: team,
    });
});
exports.getAllUniqueTeamNames = catchAsyncErrors(async (req, res, next) => {
    const uniqueTeamNames = await Team.distinct('name');
  
    res.status(200).json({
      success: true,
      teams: uniqueTeamNames,
    });
  });
exports.displayTeam = catchAsyncErrors(async (req, res, next) => {
    const { teamId } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = 20;

    try {
        // Find the team by teamId and populate the 'members' field with user details
        const team = await Team.findOne({ teamId })
            .populate({
                path: 'members',
                select: ['first_name', 'last_name', 'email'],
                options: {
                    limit: limit,
                    skip: (page - 1) * limit,
                },
            });

        if (!team) {
            return next(new errorHandler(`Team with teamId ${teamId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            team,
        });
    } catch (error) {
        return next(new errorHandler(error.message, 500));
    }
});

exports.addUsersToTeam = catchAsyncErrors(async (req, res, next) => {
    const { name, id1 } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ id1 });

        if (!user) {
            return next(new errorHandler(`User with email ${id1} not found.`, 404));
        }

        // Find the team by teamId
        const team = await Team.findOne({ name });

        if (!team) {
            return next(new errorHandler(`Team with name ${name} not found.`, 404));
        }

        // Add the user to the team
        team.members.push(user);
        user.available=false;
        // Save the team
        await team.save();
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.first_name} ${user.last_name} added to team ${team.name}.`,
        });
    } catch (error) {
        return next(new errorHandler(error.message, 500));
    }
});


