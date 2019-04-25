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



//USER EDIT ROUTE
router.get('user/:id/edit', (req, res)=>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('user/edit.ejs', {
      user: foundUser
    })
  })
})
// router.get('/:id/edit', async (req, res) => {

//   try{

//   const foundUser = await User.findById(req.params.id);

  

//   }catch (err){
//     console.log(err);
//     res.render('user/edit.ejs', {
//       user: foundUser
//     })
    
//    }
// });   


//USER UPDATE ROUTE
router.put('/:id', async (req, res)=>{
 
 try{

  const foundUserFromDB = await User.findByIdAndUpdate(req.params.id, req.body);

 } catch(err){
   console.log(err);
   res.redirect('/user/id');
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
    }catch(err){
        console.log(err);
        res.redirect('/user');
    }
    
});

module.exports = router;
