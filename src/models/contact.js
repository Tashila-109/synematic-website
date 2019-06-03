const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        trim: true,
        default: 'Get in Touch!'
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact