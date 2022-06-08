import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));
app.use(express.static(path.resolve("public")));
app.use(express.urlencoded())

let id = 4;
let idCar = 0;
let login = false;
let cadastrado = [{
  id,
  nome: '',
  email: '',
  senha:'',
}]

let carro = [{
  idCar: 1,
  marca: 'Lamburgini',
  modelo: 'Urus',
  ano: '2021',
  descricao: 'Carro de luxo',
  valor: '400',
  imagem: 'https://bocamafra.com.br/wp-content/uploads/2022/04/ce958848b03147f08e8726be17f38279_1650465916897-1-1024x768.jpeg'
},{
  idCar: 2,
  marca: 'Mercedes',
  modelo: 'Classe C',
  ano: '2021',
  descricao: 'Carro de luxo',
  valor: '300' ,
  imagem: 'https://s2.glbimg.com/S9bHDjo_7GX7wlCF0M1Y6lm1XGI=/0x0:1561x935/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/I/r/t8g0utQximKTnwNXu7Zw/mercedes-benz-c-200-amg-line-593.jpeg'
},{
  idCar: 3,
  marca: 'BMW',
  modelo: 'X5',
  ano: '2021',
  descricao: 'Carro de luxo',
  valor: '350',
  imagem: 'https://bocamafra.com.br/wp-content/uploads/2022/03/486abd4d6a5e4a1b97ba3b65b3af6089_1645284111688-1-1024x768.jpeg'
},
{
  idCar: 4,
  marca: 'Audi',
  modelo: 'Q8',
  ano: '2021',
  descricao: 'Carro de luxo',
  valor: '400',
  imagem: 'https://bocamafra.com.br/wp-content/uploads/2022/03/d482bd1de42845b78051c9a793621c5b_1647367331065-1-1024x768.jpeg'
}]


app.get("/", (req, res) => {
  res.render("index" , {login , carro});
});

app.get("/ofertas", (req, res) => {
  res.render("oferta" , {login, carro });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro" , {login, carro});
});

app.get("/login", (req, res) => {
  res.render("login" , {login , carro});
});

app.get("/signin", (req, res) => {
  res.render("signin" , {login , carro});
});

app.get('/logout', (req, res) => {
  login = false
  res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
  let deletar = req.params.id
  carro = carro.filter(carro => carro.idCar != deletar)
  res.redirect('/oferta')
})

app.post("/login", (req, res) => {
  let validacao = req.body;
  cadastrado.forEach(el =>{
    if(el.email == validacao.email && el.senha == validacao.senha){
      login = true;
      res.redirect("/ofertas");
    }
  })
});

app.post("/cadastrar", (req, res) => {
  idCar += 1
  let cadastro = {
    idCar, idCar,
    marca: req.body.marca,
    modelo: req.body.modelo,
    ano: req.body.ano,
    descricao: req.body.descricao,
    valor: req.body.valor,
    imagem : req.body.img
  }
  carro.push(cadastro)
  res.redirect("/ofertas");
});

app.post("/cadastroLogin", (req, res) => {
  id += 1
  let cadastro = {
    id,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }
  cadastrado.push(cadastro)
  res.redirect('/login')
});

app.listen(port, () => {
  console.clear();
  console.log("servidor rodando");
  console.log("http://localhost:3000");
});
