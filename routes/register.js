import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    const {
        username,
        phone,
        email,
        password
    } = req.body;

    try {
        let user_exist = await User.findOne({ phone: phone });
        if (user_exist) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let user = new User({
            username: username,
            phone: phone,
            email: email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            msg: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                phone: savedUser.phone,
                email: savedUser.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

export default router;