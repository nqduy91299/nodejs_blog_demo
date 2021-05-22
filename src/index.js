const path = require('path')
// const morgan = require('morgan');
const express = require('express');
const app = express();
const methodOverride = require('method-override')
const handlebars =  require('express-handlebars');
const port = process.env.PORT || 2020;
const session = require('express-session');
const moment = require('moment');
const flash = require('connect-flash')

const route = require('./routes');
const db = require('./config/db');

db.connect();

// Init express-session
app.use(session({
    secret: 'secret-key-blog',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 }
}))

// Init flash-message
app.use(flash())

app.use('/images',express.static(path.join(__dirname, 'public', 'img')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Override method summit of mongo
app.use(methodOverride('_method'))

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
    extname: 'hbs',
    helpers:{
        sum: (a, b) => a + b,
        dateTransform: (date) => moment(moment.utc(date)).format('HH:mm DD/MM/YYYY'),
        shortenString: ((string) => {
            if(string.length > 300){
                return string.substring(0, 300) + '...';
            }
            return string
        })
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// // Route init
route(app);

app.listen(port, () => { console.log('hello nodejs, http://localhost:' + port)})