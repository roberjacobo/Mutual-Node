const express = require('express');
var cors = require('cors')
const morgan = require('morgan');
const app = express();

app.use(express.json());

/* ===== Enable cors ========= */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(cors())
const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/charges', require('./Routes/charge.routes'));
app.use('/api/employees', require('./Routes/employee.routes'));
app.use('/api/clients', require('./Routes/client.routes'));
app.use('/api/payments', require('./Routes/payment.routes'));
app.use('/api/login', require('./Routes/login'));

//Starting the server
app.listen(3000, "127.0.0.1", err => {
    if (err) throw err;
    console.error(`server listening on 3000`);
});