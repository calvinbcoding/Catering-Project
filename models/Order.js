const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    caterer: {type: String, required: false, unique: true},
    type: {type: String, required: false},
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;