
const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User is already exist, you can logain..', success: false })
        }

        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "signup successfully...",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error...',
            success: false
        })
    }
}


const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errormessage = 'Invalid email or password, please try again..'
        if (!user) {
            return res.status(403).json({ message: errormessage, success: false })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(403).json({ message: errormessage, success: false })
        }

        const jwtToken = jwt.sign(
            {email: user.email,_id:user._id},
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }                                                                                                                                                                                                                     
        )


        res.status(200).json({
            message: "login successfully...",
            success: true,
            jwtToken,
            email,
            name:user.name
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error...',
            success: false
        })
    }
}

module.exports = {
    signup,
    login
}













