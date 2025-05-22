import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = express.Router();

router.post('/login', async(req, res) => {
    const { phone, password } = req.body;
    try {
        let user_exist = await User.findOne({ phone: phone });
        if (user_exist) {
            // Compare provided password with the hashed password stored in the database
            const isMatch = await bcrypt.compare(password, user_exist.password);
            if (isMatch) {
                
                const payload = { id: user_exist._id, phone: user_exist.phone };
                
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
                await user_exist.save();

                const { password, ...userObject } = user_exist.toObject();
                res.json({
                    success: true,
                    accessToken: accessToken,
                    user: userObject,
                    msg: "Logged in successfully"
                });
            } else {
                res.json({
                    success: false,
                    msg: "Wrong password"
                });
            }
        } else {
            res.json({
                success: false,
                msg: "User doesn't exist"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

export default router;
