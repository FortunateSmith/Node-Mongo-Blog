const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog.js");
const { render } = require("ejs");
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes.js')

// express app
const app = express();
const PORT = 3000;

// connect to MongoDB
const dbURI = process.env.MongoDB_URI;
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(PORT, function (err) {
      if (err) {
        console.log("Error in server setup");
      }
      console.log(`Server listening on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");
// middleware functions fire in order
app.use(morgan("dev"));
// to serve static files such as CSS
app.use(express.static("public"));
// passes url encoded data to a useable object (for accepting form data)
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // .send automatically works out header, status code
  // res.send('<p>About Page </p>')
  // res.sendFile("/views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// blog routes
app.use('/blogs', blogRoutes)
// 404 error MUST GO AT BOTTOM AS A CATCH ALL!!!
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
