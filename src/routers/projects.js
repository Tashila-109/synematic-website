const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')
const { sendWelcomeEmail } = require('../emails/email')

// Augmented Reality Food Page
router.get('/arfood', (req, res) => res.render('food', {
    title: 'AR-Food | Synematic'
}))


// Contact handler in AR Food Page
router.post('/arfood', async (req, res) => {
    const { first_name, last_name, email, subject, message } = req.body
    const newContact = new Contact({
        first_name,
        last_name,
        email,
        subject,
        message
    })

    try {
        await newContact.save() 

        sendWelcomeEmail(newContact.email, newContact.first_name)
        req.flash('success_msg', ' Thank you for contacting us!')
        res.redirect('/projects/arfood#contactSection')
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router