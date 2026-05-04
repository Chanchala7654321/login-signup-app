const ensureAuthenticated = require('../middlewares/Auth');


const router = require('express').Router();

router.get('/',ensureAuthenticated, (req, res) => {

    console.log('======= login in user detail ========', req.user)

    res.status(200).json([
        {
            name: 'iPhone 14 Pro Max',
            price: 120000,
        },
        {
            name: 'Samsung Galaxy S22 Ultra',
            price: 110000,
        }

    ])
});



module.exports = router;



