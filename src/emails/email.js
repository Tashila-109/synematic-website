const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'synematiclk@gmail.com',
        subject: 'Thanks for contacting us!',
        text: `Welcome to Synematic, ${name}. Thanks alot for the message. We will get back to you soon!`
    })
}

module.exports = {
    sendWelcomeEmail
}