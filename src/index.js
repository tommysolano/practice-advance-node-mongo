const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // view engine
const methodOverride = require('method-override') // can send put and deleted
const session = require('express-session'); 

//initiliazations
const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'))
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), 'layouts'),
    partialsDir: path.join(app.get("views"), 'partials'),
    extname: ".hbs"
}))
app.set("view engine", ".hbs")

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true
}))

//global variables

//routes

//static files

//server is listening
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"));
})