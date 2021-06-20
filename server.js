//to check if we are ruunning in the production environment or not

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const bodyParser=require('body-parser')

const indexRouter=require('./routes/index.js')
const authorRouter=require('./routes/authors.js')
const bookRouter=require('./routes/books.js')

app.set('view engine','ejs')
app.set('views', __dirname + '/views') // to set where our views coming from
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public')) //to tell express where our public files are going to be
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true}) // usenewurlparser lo awaya mongoose versiona nweyakae bakar bini
const db=mongoose.connection //lo accesse connectiona 
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

app.use('/',indexRouter) 
app.use('/authors',authorRouter) 
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)

