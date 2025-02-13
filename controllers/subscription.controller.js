import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({...req.body, user: req.user._id})
        return res.status(201).json({data: subscription})
    } catch (error) {
        next(error)
    }
}

export const getSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            return res.status(401).json({message: "You are not authorized to view this user's subscriptions"})
        }
        const subscriptions = await Subscription.find({user: req.params.id})
        return res.status(200).json({data: subscriptions})
    } catch (error) {
        next(error)
    }
}