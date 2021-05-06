const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const kees = require('./config/kees')
const analysticsRoutes = require('./routes/analystics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const app = express()
const a = ''
const v = ''
mongoose.connect(kees.mongoURI)
.then(()=>console.log('mongo connected'))
.catch(error=>console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/api/auth',authRoutes)
app.use('/api/analystics',analysticsRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/position',positionRoutes)






module.exports = app

