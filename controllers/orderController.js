const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');


router.get('/new', async (req, res) => {

    try {
        res.render('order/new.ejs');
    }catch(err){
        res.send(err)
    }
    
})

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


//order create
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
  
//order delete route
router.delete('/:id', async (req, res) => {

    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        const deletedUser = await User.deleteMany({
            _id: {
                $in: order.user
            }
        })
        res.redirect('/order')


    } catch (err) {
        res.send(err)
    }

});





module.exports = router;