import generateToken from './generateToken.js';

const userLogin = async (req, res, next) => {
    const { user } = req;

    res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
    });
};

export default { userLogin };
