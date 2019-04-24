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
        res.render('order/index.ejs', {
            order: foundOrders,

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
                    res.redirect('/order');
                });
            });
        }
    });
});

//order show route

router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findOne({'order': req.params.id}).populate({path: 'order', match: {_id: req.params.id}})

        console.log(foundUser);
        res.render('order/show.ejs', {
          user: foundUser,
          order: foundUser.orders[0]
        })
  
    } catch(err){
      res.send(err);
    }
  
  });
  






module.exports = router;