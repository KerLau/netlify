import User from './userModel.js';
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        req.user = user;
        next();
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
};

export default authMiddleware;
