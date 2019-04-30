const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

      //order new route 
    router.get('/new', async (req, res)=>{
    try {
        res.render('order/new.ejs', {
            user: req.session.userId,
            isCaterer: req.session.caterer
        });

    } catch (err) {
        res.send(err);
    }
    });


//index
router.get('/', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        const foundOrder = await Order.find({});
        console.log(foundOrder)
        res.render('order/index.ejs', {
            order: foundOrder,
            user:foundUser,
            isCaterer: req.session.caterer

        });
    } catch (err) {
        res.send(err);
    }
});



// //new
// router.get('/new', async (req, res) => {

//     try {
//         res.render('order/new.ejs', {
//         user: allUser,
//         })
//     }catch(err){
//         res.send(err)
//     }
    
// });



//order create
router.post('/', async (req, res) => {

    try{
        const foundUser = await User.findById(req.session.userId)
        const newlyCreatedOrder = await Order.create(req.body);
        // console.log(newlyCreatedOrder + '<== newly created order before')
        // console.log(req.body.type + '<== type from the form before')
        // console.log(foundUser +'<== found user before')
 
        foundUser.order.push(newlyCreatedOrder);
        // console.log(newlyCreatedOrder + '<== newly created order after')
        // console.log(foundUser + '<== found user after')
        foundUser.save();
        res.redirect('/user/'+req.session.userId); 
        // console.log(foundUser + '<== found user after saved array')
    } catch(err){
        console.log(err)
        res.send(err);
        
    }
    
 });

   


//order show route
router.get('/:id', async (req, res) => {
    try{
        const foundOrder = await Order.findById(req.params.id);
        const foundUser = await User.findOne({"order": req.params.id});
        
        res.render('order/show.ejs', {
            order: foundOrder,
            isCaterer: req.session.caterer
        })
    }catch(err){
        res.send(err);
    }
});


router.get('/:id/confirm', async (req, res)=>{
    console.log(req.params.id)
        try{
            
            const findUsersOrders = await Order.findById(req.params.id).populate('order')
            // .populate({
            //     path: 'order',
            //     match: {
            //         _id: req.params.id
            //     }
               
            // })
                console.log(findUsersOrders)
                
                res.render('./confirm.ejs', {
                    order: findUsersOrders,
                    user: req.session.username,
                    isCaterer: req.session.caterer
                })
    
        }catch(err){
            res.send(err)
    
        }
    
      });
    



  //order Edit

  router.get('/:id/edit', async (req, res)=>{
console.log(req.params.id)
    try{
        const findUsersOrders = await Order.findById(req.params.id)
        // .populate({
        //     path: 'order',
        //     match: {
        //         _id: req.params.id
        //     }
           
        // })
            console.log(findUsersOrders)
            
            res.render('order/edit.ejs', {
                order: findUsersOrders,
                isCaterer: req.session.caterer
            })

    }catch(err){
        res.send(err)

    }

  });



router.put("/:id", async (req,res)=>{

    try{

        
   const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});
   const foundUser = await User.findOne({
       'order': req.params._id,
   });
    console.log(updatedOrder + '<== newly updated order after')
    res.redirect('/');
    console.log(foundUser + '<== found user after saved array')

    }catch(err){
        console.log(err)
        res.send(err);
    }
});



        // const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        //     new: true
        // });
        // const foundUser = await User.findOne({
        //     'order': req.params.id
        // });
        // foundUser.order.remove(req.params.id);
        // foundUser.save();
    // try {
        
    //             .populate({
    //                 path: 'order',
    //                 match: {
    //                     _id: req.params.id
    //                 }
    //             })
    //             .exec((err, foundArticleUser) => {
    //                     console.log(foundArticleUser, "<==== foundArticleUser")
    //                     if (err) {
    //                         res.send(err);
    //                     } else {
    //                         res.render('order/edit.ejs', {
    //                             article: foundArticleUser.order[0],
    //                             Users: allUsers,
    //                             articleUser: foundArticleUser
    //                         })
    //                     }







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

  

router.delete('/:id', async (req,res)=>{
    try{

 const deletedOrder = await Order.findByIdAndRemove(req.params.id);
 const foundUser = await User.findOne({
     'order': req.params.id
 });
 foundUser.order.remove(req.params.id)
 foundUser.save(foundUser.order)
 res.redirect("/order")
    }catch(err){
        res.send(err)
    }
    
})



module.exports = router;