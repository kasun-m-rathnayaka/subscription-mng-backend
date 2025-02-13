import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getSubscriptions} from "../controllers/subscription.controller.js";

const subscriptionRoute = Router();

subscriptionRoute.get('/',(req,res)=>{
    res.send({title:'get subscription'})
})
subscriptionRoute.get('/:id',(req,res)=>{
    res.send({title:'get a subscription'})
})
subscriptionRoute.post('/',authorize, createSubscription)
subscriptionRoute.put('/:id',(req,res)=>{
    res.send({title:'update a subscription'})
})
subscriptionRoute.delete('/:id',(req,res)=>{
    res.send({title:'get all user subscriptions'})
})
subscriptionRoute.get('/user/:id',authorize, getSubscriptions)

subscriptionRoute.put('/:id/cancel',(req,res)=>{
    res.send({title:'cancel subscription'})
})
subscriptionRoute.get('/upcoming-renewals',(req,res)=>{
    res.send({title:'create upcoming-renewals'})
})

export default subscriptionRoute