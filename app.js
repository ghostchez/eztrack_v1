let createError = require('http-errors');
let express = require('express');
const session = require('express-session');
let path = require('path');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
require('dotenv').config()
const winston = require('winston');
var methodOverride = require('method-override');

let port = process.env.PORT;


let app = express();
/* CHAT */
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "https://localhost:3001"
  }
});


app.set('trust proxy', 1) // trust first proxy

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'marianoCMS',
  resave: true,
  saveUninitialized: true,
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

/* ENRUTADO */
let indexRouter = require('./routes/index');//ruta del controlador Index
let usuariosRouter = require('./routes/usuarios');//ruta del controlador Usuarios
let adminRouter = require('./routes/admin');//ruta del controlador Usuarios
let serviciosRouter = require('./routes/servicios');//ruta del controlador Usuarios


let listen = app.listen(port,()=>{
  console.log("Port listening in :"+port);
});
let moment = require('moment');
moment.locale('es');
app.use(function(req, res, next){
  res.locals.session = req.session ?? null;
  res.locals.moment = moment;
  next();
});


//logger de errores
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/admin', adminRouter);
app.use('/servicios', serviciosRouter);

module.exports = app;





