/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.js");

const middleware = async (req, res, next) => {
    // Get token from header
    let token
    const authHeader = req.headers.authorization
    
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // extract token from authHeader string
            token = authHeader.split(' ')[1]
            
            // verified token returns user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // find user's obj in db and assign to req.user
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            return res.status(401).json({
                statusCode: 401,
                errors: { msg: 'Not authorized, invalid token.', errorCode: 'noToken' },
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            errors: { msg: 'Not authorized, no token found.', errorCode: 'noToken' },
        });
    }

};

module.exports = { middleware };