const express = require("express");
const hbs = require("hbs");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname + "/public")));
app.set("view engine", hbs);

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}\n`;
  fs.appendFileSync("server.log", log);
  next();
});

hbs.registerPartials(__dirname + path.join("/views/partials"));
hbs.registerHelper("getFullYear", () => {
  return new Date().getFullYear();
});

app.get("/", (req, resp) => {
  resp.render("Home.hbs", { name: "Home" });
});
app.get("/about", (req, resp) => {
  resp.render("About.hbs", { name: "About" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
