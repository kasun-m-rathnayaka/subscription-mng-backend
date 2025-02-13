import {Router} from "express";

const subscriptionRoute = Router();

subscriptionRoute.get('/',(req,res)=>{
    res.send({title:'get subscription'})
})
subscriptionRoute.get('/:id',(req,res)=>{
    res.send({title:'get a subscription'})
})
subscriptionRoute.post('/',(req,res)=>{
    res.send({title:'create subscription'})
})
subscriptionRoute.put('/:id',(req,res)=>{
    res.send({title:'update a subscription'})
})
subscriptionRoute.delete('/:id',(req,res)=>{
    res.send({title:'get all user subscriptions'})
})
subscriptionRoute.get('/user/:id',(req,res)=>{
    res.send({title:'get all subscriptions'})
})
subscriptionRoute.put('/:id/cancel',(req,res)=>{
    res.send({title:'cancel subscription'})
})
subscriptionRoute.get('/upcoming-renewals',(req,res)=>{
    res.send({title:'create upcoming-renewals'})
})

export default subscriptionRoute