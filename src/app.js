const express = require('express')
require('./db/mongoose')
const path = require('path')
const hbs = require('hbs')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Bodyparser
app.use(express.urlencoded({
    extended: false
}))

// Public Directory
app.use(express.static(publicDirectoryPath))

// Routes
app.use(express.json())
app.use('/', require('./routers/index'))
app.use('/aboutus', require('./routers/index'))
app.use('/contactus', require('./routers/index'))
app.use('/comingsoon', require('./routers/index'))



module.exports = app