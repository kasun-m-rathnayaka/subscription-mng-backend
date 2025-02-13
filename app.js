import express from 'express'
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import cookieParser from 'cookie-parser'

import userRoute from "./routes/user.route.js";
import subscriptionRoute from "./routes/subscription.route.js";
import authRoute from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(arcjetMiddleware)
// api/v1/users/sign-up - middleware
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/subscriptions',subscriptionRoute)

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    await connectToDatabase()
})

