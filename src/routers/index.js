const express = require('express')
const Contact = require('../models/contact')
const router = express.Router()
const { sendWelcomeEmail } = require('../emails/email')


// Home Page
router.get('/', (req, res) => res.render('index'))

// About-Us Page
router.get('/aboutus', (req, res) => res.render('about-us'))

// Contact-us Page
router.get('/contactus', (req, res) => res.render('contact-us'))

// Coming-Soon Page
router.get('/comingsoon', (req, res) => res.render('coming-soon'))


// Contact handler in Home Page
router.post('/', async (req, res) => {
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
        res.redirect('/')
        
    } catch (error) {
        console.log(error);
    }
})

// Contact Handler for Contact-us Page
router.post('/contactus', async (req, res) => {
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

        res.redirect('/contactus')
        
    } catch (error) {
        console.log(error);
    }
})



module.exports = router