//setup modules
const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

//setup directory
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

//setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

//setup static file
app.use(express.static(publicDirectory));

//setup routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tousif",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tousif",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "I am here to help you.",
    name: "Tousif",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found.",
    name: "tousif",
    title: "Help article",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Please provide address!",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      foreCast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please enter a search value.",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "tousif",
    title: 404,
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Listening to 3000");
});
