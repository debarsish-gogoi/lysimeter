import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({});

const requireAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            msg: 'No token provided. Unauthorized access.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       
        const user = await User.findOne({ phone: decoded.phone });

        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({
                success: false,
                msg: 'Access denied. Admins only.'
            })
        }

    } catch (err) {
        console.error('Error finding user:', err);
        res.status(500).json({
            success: false,
            msg: 'Internal Server error'
        });
    }
    
};

export default requireAdmin;