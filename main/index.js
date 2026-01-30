const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(morgan("combined"));

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

    app.get("/", (req, res) => {
  res.render("home");
});

app.get("/search", (req, res) => {
  console.log(req.query);
  res.render("search");
});

app.post("/hi", (req, res) => {
  res.render("https://www.youtube.com/?app=desktop&hl=vi");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
