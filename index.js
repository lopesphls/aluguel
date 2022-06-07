import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded())

let id = 0;
let cadastrado = [{
  id,
  nome: '',
  email: '',
  senha:'',
}]


app.get("/", (req, res) => {
  res.render("index");
  console.log(cadastrado)
});

app.get("/ofertas", (req, res) => {
  res.render("oferta");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post("/login", (req, res) => {
  let validacao = req.body;
  cadastrado.forEach(el =>{
    if(el.email == validacao.email && el.senha == validacao.senha){
      res.redirect("/ofertas");
    }
  })
});

app.post("/cadastro", (req, res) => {
  id += 1
  let cadastro = {
    id,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }
  cadastrado.push(cadastro)
  console.log(cadastrado)
  res.render("signin");
});

app.listen(3000, () => {
  // console.clear();
  console.log("servidor rodando");
  console.log("http://localhost:3000");
});
