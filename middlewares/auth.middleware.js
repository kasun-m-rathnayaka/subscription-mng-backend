import {JWT_SECRET} from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    // implement authorization logic
    try {
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token) {
            return res.status(401).json({message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        const user = await User.findById(decoded.id)
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized", error:error})

    }
}

export default authorize