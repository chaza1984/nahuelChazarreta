
const express = require('express')
const app = express();
const morgan = require('morgan')


module.exports = app;

const path = require('path')              




//Static js, css files Relative PATH en "public"
app.use(express.static(path.join(__dirname,'public')))

//Setting    relative path en VIEWS solamente para archivos ejs
app.set('port', 5000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false})) // este metodo nos permite entender lo que viene del form


//Routes
app.use(require('./routes/index'))

//404 handler
app.use((req,res,next)=>{
    res.status(404).send('404 not found')
})

