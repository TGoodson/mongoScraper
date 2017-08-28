const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');

// import route
const htmlRoutes = require('./controllers/html.js');
const commentRoutes = require('./controllers/comment.js');

// setup app
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('_method'));

// setup view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// setup routes and public
app.use('/', htmlRoutes);
app.use('/api/comment', commentRoutes);
app.use(express.static('public'));

// database configuration with mongoose
mongoose.connect('');
const db = mongoose.connection;
db.on('error', error => console.log('Mongoose Error: ', error));
db.once('open', () => console.log('Mongoose connection successful.'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening: Port ${port}`));


