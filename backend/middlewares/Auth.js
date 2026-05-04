
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({
            message: 'Unauthorized, JWT token is required',
            // success: false
        })
    }

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
        req.user = decoded; // JWT token से user की जानकारी प्राप्त करें
        next(); // अगले middleware या route handler पर जाएं
    } catch (err) {
        return res.status(403).json({
            message: 'Unauthorized, invalid JWT token',
            // success: false
        })
    }

};



module.exports = ensureAuthenticated;

