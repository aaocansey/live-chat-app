const mongoose = require('mongoose');

exports.connect = async() => {
    try {
        await mongoose.connect('mongodb+srv://albertocansey582:s0JS3LxnYK8yYsP3@cluster0.cpscziy.mongodb.net/live_chat?retryWrites=true&w=majority&appName=Cluster0')
    } catch (error) {
        console.log(error)
    }
}