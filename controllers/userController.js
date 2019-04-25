const express = require('express');
const router  = express.Router();
const User  = require('../models/User');
const Order = require('../models/Order');



//user index route
router.get('/', (req, res) => {

    // show all of the resource
    User.find({}, (err, foundUser) => {
      if(err){
        res.send(err)
      } else {
        res.render('user/index.ejs', {
          user: foundUser
        })
      }
    });
  });
  


  //User new route 
  router.get('/new', async (req, res)=>{
    try {
       
      const allUsers = await User.find({});
 
 
     res.render('user/new.ejs', {
         user: allUsers
       });
 
   } catch (err) {
 
       res.send(err);
   }
 });

//user show
  router.get('/:id', async (req, res) => {

    try {
        const foundOrder = await Order.findOne({user:req.params.id})
        const foundUser = await User.findById(req.params.id);
        res.render('user/show.ejs', {
            user: foundUser,
            order: foundOrder
        });

    } catch (err) {
        res.send(err)
    }
   
});

//delete route
router.delete('/:id', async (req, res) => {
    
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        const deletedOrder = await Order.deleteMany({
            _id: {
                $in: user.order
            }
        })
        res.redirect('/user')


    }catch(err){
        res.send(err)
    }

});

module.exports = router;
