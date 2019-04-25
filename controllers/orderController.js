const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');


//index
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



//new
router.get('/new', async (req, res) => {

    try {
        res.render('order/new.ejs');
    }catch(err){
        res.send(err)
    }
    
})

//order create
router.post('/', async (req, res) => {
    try {
        const createdOrder = await Order.create(req.body) 
    } catch{ 

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
          order: foundUser.order[0]
        })
  
    } catch(err){
      res.send(err);
    }
  
  });

  //order Edit

//   router.get('/:id/edit', async (req, res)=>{
//     // For the edit, we need to allow the user to Select all the Users when they are editing the
//    // User, thats why we are performing User.find
 
//    // then we need to find the article and the User who owns the article that we
//    // are trying to edit
//    // thats why we are using User.findOne
//    // we are using .populate to find all the order
//    // we use match, to only populate the article that matches the article we are trying to edit
//     try{ const allUsers = await User.find({});
//         const 
//         User.find({}, (err, allUsers) => {
//      User.findOne({'order': req.params.id})
//        .populate({path: 'order', match: {_id: req.params.id}})
//        .exec((err, foundArticleUser) => {
//          console.log(foundArticleUser, "<==== foundArticleUser")
//          if(err){
//            res.send(err);
//          } else {
//            res.render('order/edit.ejs', {
//              article: foundArticleUser.order[0],
//              Users: allUsers,
//              articleUser: foundArticleUser
//            })
//          }
//        })
 
//    })
//  });
 
//  router.put('/:id', (req, res)=>{
//   //if the User is changed,
//   // 1 . then the article goes into a different User's array
//   // 2. and is removed from the original User's array of order
 
//   // First update the article, theat the purpose of the Article query on line 114
//    Article.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedArticle)=>{
//      // find the User that owns the article
//      User.findOne({'order': req.params.id}, (err, foundUser) => {
//        // Check to see if the User was changed by the client
//        if(foundUser._id.toString() !== req.body.UserId){
//          // so if I'm inside of the if
//          // that means the client sent a request with the User changed
//          foundUser.order.remove(req.params.id);
//          // removed the article reference from the original User ^
//          foundUser.save((err, savedFoundUser) => {
//            // Find the new User and add the article refence to its order array
//            User.findById(req.body.UserId, (err, newUser) => {
 
//              // updated article is reference in the Article query at the top
//              newUser.order.push(updatedArticle);
//              // save the document since we mutated it
//              newUser.save((err, savedNewUser) => {
//                res.redirect('/order/' + req.params.id);
//              })
 
//            })
 
//          })
//        } else {
//          // if the User didn't change everything was taken care of in
//          // the orginal Article query on line 100
//          res.redirect('/orders/' + req.params.id)
//        }
 
 
//      })
 
 
 
//    });
//  });

  
//order delete route
router.delete('/:id', async (req, res) => {

    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        const deletedUser = await User.deleteMany({
            _id: {
                $in: user.order
            }
        })
        res.redirect('/order')


    } catch (err) {
        res.send(err)
    }

});





module.exports = router;