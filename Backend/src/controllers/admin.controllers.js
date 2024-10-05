import { Employee } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { deleteImageFromCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

// Edit Employee
const editEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(404, "Id not valid");
    }

    const { name, email, mobileNo, designation, gender, courses } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    //delete old avatar if provided
    if (req.file) {
        // Delete old image from Cloudinary
        if (employee.avatar) {
            // const public_id = employee.avatar.split("/").pop().split(".")[0];
            // await cloudinary.uploader.destroy(`employees/${public_id}`);
            await deleteImageFromCloudinary(employee.avatar);
        }

        const avatarLocalPath = req.file?.path;

        // upload new avatar
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        employee.avatar = avatar.secure_url;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
            name: name || employee.name,
            email: email || employee.email,
            mobileNo: mobileNo || employee.mobileNo,
            designation: designation || employee.designation,
            gender: gender || employee.gender,
            courses: Array.isArray(courses)
                ? courses
                : [courses] || employee.courses,
        },
        { new: true }
    );

    if (!updatedEmployee) {
        throw new ApiError(501, "Error while update employee details");
    }

    res.status(200).json(
        new ApiResponse(200, updatedEmployee, "Employee details updated")
    );
});

// Delete Employee
const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    // Delete image from Cloudinary
    if (employee.avatar) {
        const deleteRes = await deleteImageFromCloudinary(employee.avatar);
        console.log(deleteRes);
    }

    await Employee.findByIdAndDelete(id);

    res.status(200).json({
        status: 200,
        message: "Employee deleted successfully",
    });
});

const getAllEmployees = asyncHandler(async (req, res) => {
    const getAllEmployee = await Employee.find();

    if (!getAllEmployee.length) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Employee list empty"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, getAllEmployee, "All employees fetched"));
});

export { editEmployee, deleteEmployee, getAllEmployees };
