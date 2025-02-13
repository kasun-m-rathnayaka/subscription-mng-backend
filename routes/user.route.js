import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.get('/', getUsers); // Pass getUsers as a reference
userRoute.get('/:id', authorize, getUser); // Pass getUser as a reference
userRoute.post('/', (req, res) => {
    res.send({ title: 'create users' });
});
userRoute.put('/', (req, res) => {
    res.send({ title: 'update user' });
});
userRoute.delete('/', (req, res) => {
    res.send({ title: 'delete user' });
});

export default userRoute;