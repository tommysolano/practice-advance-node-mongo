const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // view engine
const methodOverride = require('method-override') // can send put and deleted
const session = require('express-session'); 
const flash = require('connect-flash')
const passport = require('passport')


//initiliazations
const app = express();
require("./database")
require("./config/passport")

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'))
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), 'layouts'),
    partialsDir: path.join(app.get("views"), 'partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    extname: ".hbs"
}))
app.set("view engine", ".hbs")

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method', {methods: ["POST", "GET"]}))
app.use(session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.errors_msg = req.flash("errors_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null;
    next()
})


//routes
app.use(require("./routes/index"))
app.use(require("./routes/notes"))
app.use(require("./routes/users"))

//static files
app.use(express.static(path.join(__dirname, "public")))

//server is listening
app.listen(app.get("port"), () => {
    console.log("server on port", app.get("port"));
})