import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {JWT_EXPIRE, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res) => {
    // implement sign up logic
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        // create new user
        const {name, email, password} = req.body
        // check if user exists
        const existingUser = await User.findOne({email})

        if (existingUser) {
            const error = res.status(409).json({message: "User already exists"})
            throw error
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], {session})

        const token = jwt.sign({email: newUser.email, id: newUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE})

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({success: true, message: "New user created", data: {user: newUser, token}})
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        return res.status(500).json({message: error.message})
    }

}

export const signIn = async (req, res, next) => {
    // implement sign in logic
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE})

        res.status(200).json({success: true, message: "User signed in", data: {user, token}})
    }
    catch (error) {
        next(error)
    }
}

export const signOut = async (req, res) => {
    // implement sign out logic
}