const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    caterer: {type: String, required:true},
    type: {type: String, required: true},
    price: Number,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;