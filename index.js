import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));
app.use(express.static(path.resolve("public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.clear();
  console.log("servidor rodando");
  console.log("http://localhost:3000");
});
