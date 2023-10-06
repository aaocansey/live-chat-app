const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const msgSchema = new Schema({
    text:{type:String},
    userId:{type:String}
})



module.exports = mongoose.Model('msg', msgSchema);