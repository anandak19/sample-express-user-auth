const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const creaeError = require("http-errors");
const session = require("express-session");
const morgan = require("morgan");

const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views/layout"),
  })
);

app.use(
  session({
    secret: "user_authkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: null,
      httpOnly: true,
    },
  })
);

app.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  next();
});

app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/login", loginRouter);

app.use((_req, _res, next) => next(creaeError(404)));

app.use(errorHandler);

app.listen(3000, () => console.log("Application running at port 3000"));

