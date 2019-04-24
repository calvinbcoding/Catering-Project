const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

router.get('/new',  async (req, res) =>{
    try{
        const allUsers = await allUsers.find({});
        res.render('order/new.ejs', {
            users: allUsers
        });
    } catch(err) {
        res.send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const foundOrders = await Order.find({});
        res.render('orders/index.ejs', {
            orders: foundOrders,

        });
    } catch (err) {
        res.send(err);
    }
});

router.post('/', (req, res) => {
    Order.create(req.body, (err, createdOrder)=> {
        if(err){
            res.send(err);
        } else {
            User.findById(req.body.userId, (err, foundUser) => {
                console.log(foundUser);
                foundUser.orders.push(createdOrder);
                console.log(createdOrder);
                foundUser.save((err, savedUser) => {
                    console.log(savedUser)
                    res.redirect('/orders');
                });
            });
        }
    });
});

module.exports = router;