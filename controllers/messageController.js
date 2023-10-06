const Message = require('../models/messages');

exports.createMsg = (req, res, next) => {
    const {text, userId} = req.body

    try {
        const msg = new Message({text, userId});

        res.status(200).json({message:'sent'})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}