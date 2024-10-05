import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary, {
    deleteImageFromCloudinary,
} from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Employee } from "../models/employee.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "something went wrong while generting access and refresh tokens"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, password } = req.body;

    if ([fullName, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are reuqired");
    }

    const checkUserExist = await User.findOne({ username });

    if (checkUserExist) {
        // throw new ApiError(409, "User already exists");
        return res
            .status(409)
            .json(new ApiResponse(409, {}, "User already exists"));
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring user!");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User register successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { password, username } = req.body;

    if (!username) {
        return res.status(409).json({ message: "username required" });
    }

    const userExists = await User.findOne({ username });

    if (!userExists) {
        // throw new ApiError(404, "User not exists,please SignUp first!");
        return res
            .status(409)
            .json({ message: "User not exists,please SignUp first!" });
    }

    const passwordCheck = await userExists.isPasswordCorrect(password);

    if (!passwordCheck) {
        // throw new ApiError(400, "Invalid Password");
        return res.status(409).json({ message: "Invalid Password" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        userExists._id
    );

    const loggedInUser = await User.findById(userExists._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User loggedIn successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out successfully"));
});

// Create Employee
const createEmployee = asyncHandler(async (req, res) => {
    const { name, email, mobileNo, designation, gender, courses } = req.body;

    if (!name || !email || !mobileNo || !designation || !gender || !courses) {
        throw new ApiError(400, "All fields are required");
    }
    if (!email.includes("@")) {
        return res
            .status(401)
            .json(new ApiResponse(401, {}, "Email should be valid"));
    }

    const employeeExist = await Employee.findOne({
        $or: [{ email }, { mobileNo }],
    });

    if (employeeExist) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Can't create more then one employee with same email"
                )
            );
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError("Avatar not uploaded on cloudinary ");
    }

    const employee = await Employee.create({
        name,
        email,
        mobileNo,
        designation,
        gender,
        courses: Array.isArray(courses) ? courses : [courses], // Handle single or multiple courses
        avatar: avatar?.secure_url,
    });

    if (!employee) {
        throw new ApiError(500, "Employee creation failed");
    }

    res.status(201).json({
        status: 201,
        data: employee,
        message: "Employee created successfully",
    });
});

export { registerUser, loginUser, logoutUser, createEmployee };
