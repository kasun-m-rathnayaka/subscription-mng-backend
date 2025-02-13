import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required'], trim: true, minLength: 3, maxLength: 50},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password: {type: String, required: true, trim: true, minLength: 6, maxLength: 50},
}, {timestamps: true});


const User = mongoose.model('User', userSchema);
export default User;

//{{"name":"John Doe","email":"jhone@gmail.com","password":"123456"}}