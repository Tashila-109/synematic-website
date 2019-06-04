const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
require('./db/mongoose')
const path = require('path')
const session = require('express-session')


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', viewsPath)

// Bodyparser
app.use(express.urlencoded({
    extended: false
}))

// Express Session middleware
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)

// Connect Flash
app.use(flash())

// Public Directory
app.use(express.static(publicDirectoryPath))

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    next()
})

// Routes
app.use(express.json())
app.use('/', require('./routers/index'))
app.use('/projects', require('./routers/projects'))

module.exports = app