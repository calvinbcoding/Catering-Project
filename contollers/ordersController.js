const express = require('express');
const router = express.Router();
const Article = require('../models/Order');
const Author  = require('../models/User');

router.get('/new',  async (req, res) =>{
    try{
        const allUsers = await allUsers.find({});
        res.render('orders/new.ejs', {
            users: allUsers
        });
    } catch(err) {
        res.send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const foundOrders = await 
    }
})