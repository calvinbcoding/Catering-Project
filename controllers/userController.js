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
          user: foundUser,
          isCaterer: foundUser.caterer = true
        })
      }
    });
  });



//new
router.get('/new', async (req, res) => {

  try {
      res.render('order/new.ejs', {
      user: allUser,
      isCaterer: req.session.caterer
  });

  }catch(err){
      res.send(err)
  }
  
});


//  //user post route
//  router.post('/', async (req, res) => {
//    try{
//     const createdUser = await User.create(req.body);
//     console.log(req.body)
//     console.log(createdUser)
//     res.redirect ('/user')
    
//    }catch(err){
//      res.send(err);
//    }
//  });


//user show
  router.get('/:id', async (req, res) => {

    try {
        const foundOrder = await Order.findOne({user:req.params.id})
        const foundUser = await User.findById(req.params.id);
        res.render('user/show.ejs', {
            user: foundUser,
            order: foundOrder,
            isCaterer: foundUser.caterer
        });
    } catch (err) {
        res.send(err)
    }
});




//edit route
router.get("/:_id/edit", async (req,res)=>{
  try {
    const foundUser = await User.findById(req.params._id)
    console.log(foundUser)
    res.render('user/edit.ejs', {
      user:foundUser,
      isCaterer: req.session.caterer,
    })

  }catch(err){
    res.send(err)
  }

})


//USER UPDATE ROUTE
router.put('/:_id', async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(req.params._id, req.body, {new:true});
    console.log(updatedUser)
  } catch (err) {
    console.log(err);
   
  }
 res.redirect('/user');
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
    }catch(err){
        console.log(err);
    }
    res.redirect('/user');
});

module.exports = router;
