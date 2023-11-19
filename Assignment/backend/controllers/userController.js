const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const { authorizeRoles } = require('../middleware/auth');
const getResetPasswordToken = require('../models/userModel')
const jwt = require('jsonwebtoken')
//register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { id1,first_name,last_name, email, password,gender,avatar,domail,available } = req.body;
    const user = await User.create({
        id1,first_name,last_name, email, password,gender,avatar,domail,available
    });
    sendToken(user, 201, res);
    res.status(200).json({
        success: true,
        message: user,
    });
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler("Please Enter Email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new errorHandler("Invalid email", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    //const isPasswordMatched=await user.password===req.body.password;

    if (!isPasswordMatched) {
        return next(new errorHandler("Invalid Password", 401));
    }
    res.status(200).json({
        success: true,
        message: user,
        token: user.getJWTToken()
    });
    sendToken(user, 200, res);
})
//Logout User
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/ap1/v1/password/${resetToken}`;
    const message = `Your password rest token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password recovery email",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new errorHandler(error.message, 500));
    }
})
// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        return next(new errorHandler("Reset Password token is not valid or has been expired", 401));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not match", 401));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);


});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const { page = 1, limit = 20, search, domain, gender, available } = req.query;
    const query = {};

    if (domain) {
        query.domain = domain;
    }

    if (gender) {
        query.gender = gender;
    }

    if (available !== undefined) {
        query.available = available;
    }

    // If there is a search parameter, use it to filter by first_name or last_name
    if (search) {
        query.$or = [
            { first_name: { $regex: new RegExp(search, 'i') } },
            { last_name: { $regex: new RegExp(search, 'i') } },
        ];
    }

    try {
        // Find users based on the search filter and paginate the results
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();

        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            users,
            pages: Math.ceil(totalUsers / limit),
        });
    } catch (error) {
        return next(new errorHandler(error.message, 500));
    }
});
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const { page = 1, limit = 20, domain, gender, available } = req.query;
    const query = {};

    // Apply filters based on the presence of domain, gender, or availability parameters
    if (domain) {
        query.domain = domain;
    }

    if (gender) {
        query.gender = gender;
    }

    if (available !== undefined) {
        query.available = available;
    }

    try {
        // Find users based on the filters and paginate the results
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();
        
        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            users,
            pages: Math.ceil(totalUsers/ limit),
        });
    } catch (error) {
        return next(new errorHandler(error.message, 500));
    }
});


exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new errorHandler("Old Password is Incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//     };
//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//     });
//     res.status(200).json({
//         success: true,
//         user
//     })


//     sendToken(user, 200, res);
// });
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    console.log(users);
    res.status(200).json({
        success: true,
        // users
    })
})
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new errorHandler(`User does not exist with id :${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user,
    })
})
//Update User Role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, role, childId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $push: { children: childId },
            $set: { name, email, role },
        },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        // Handle the case where the user is not found
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        user: updatedUser,
    });

    sendToken(updatedUser, 200, res);
});


// //Delete User

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new errorHandler(`User does not exist with id :${req.params.id}`, 400));
    }
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        user
    })

    sendToken(user, 200, res);
});

exports.getCase = catchAsyncErrors(async (req, res, next) => {
    const { id, pincode } = await req.user;


})

exports.getUserWithRole = catchAsyncErrors(async (req, res, next) => {
    const role = req.params.role;

    const users = await User.find({ role });

    res.status(200).json({
        success: true,
        users,
    })
})

exports.parseToken = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if (!payload) {
        res.status(404).json({
            success: false,
            message: "Invalid token"
        })
    }

    res.status(200).json({
        success: true,
        payload
    })
})
