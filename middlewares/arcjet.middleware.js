import {aj} from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decition = await aj.protect(req, {reqested: 1})
        if(decition.isDenied()){
            if(decition.reason.isRateLimit()){
                return res.status(429).json({message: "Rate limit exceeded"})
            }
            if(decition.reason.isBot()){
                return res.status(403).json({message: "Bot detected"})
            }
            return res.status(403).json({message: "Access Denied"})
        }
        next()
    }
    catch (error) {
        return res.status(401).json({message: "Unauthorized", error})
    }
}

export default arcjetMiddleware