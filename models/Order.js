const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;