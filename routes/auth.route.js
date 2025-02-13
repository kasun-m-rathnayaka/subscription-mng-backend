import {Router} from "express";

const authRoute = Router();

authRoute.post('/sign-up', (req, res) => {
    res.send({title:'sign up'})
})
authRoute.post('/sign-in', (req, res) => {
    res.send({title:'sign in'})
})
authRoute.post('/sign-out', (req, res) => {
    res.send({title:'sign out'})
})

export default authRoute