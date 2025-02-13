import {Router} from "express";

const userRoute = Router();

userRoute.get('/users',(req,res)=>{
    res.send({title:'get all users'})
})
userRoute.get('/:id',(req,res)=>{
    res.send({title:'get user details'})
})
userRoute.post('/',(req,res)=>{
    res.send({title:'create users'})
})
userRoute.put('/',(req,res)=>{
    res.send({title:'update user'})
})
userRoute.delete('/',(req,res)=>{
    res.send({title:'delete user'})
})

export default userRoute

// GET /users - get all users