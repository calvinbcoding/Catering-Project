const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');


router.get('/', async (req, res, next) => {
                try {
                    const foundOrder = await Order.find({});
                    res.render('index.ejs', {
                        order: foundOrders
                    });

                } catch (err) {
                    res.send(err)
                }
});

// router.get('/', async (req, res) => {
//     try {
//         const foundOrders = await 
//     }
// });

module.exports = router;