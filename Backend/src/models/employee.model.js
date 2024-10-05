import mongoose, { Schema } from "mongoose";

const employeeSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        mobileNo: {
            type: String,
            required: true,
            trim: true,
        },
        designation: {
            type: String,
            enum: ["HR", "Manager", "Sales"],
            required: true,
        },
        gender: {
            type: String,
            enum: ["M", "F"],
            required: true,
        },
        courses: [
            {
                type: String,
                enum: ["MCA", "BCA", "BSC"],
            },
        ],
        avatar: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
