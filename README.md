NESSE ARTIGO TRABALHAMOS APENAS COM 2 JSON

1= titulo
2= conteudo


1- npm init
//to package.json


2- npm i --save express


3- npm i -D nodemon


4- npm i --save mongodb


5- npm i --save mongoose

//requisitando pelo postman na aba body
deve ser criado json dessa forma {"titulo": "Como criar Api", "conteudo": "Barabarabra"}

//imprimindo na hora o nosso json requisitado
app.post("/artigo", (req, res) => {
    console.log(req.body);
    return res.json(req.body)



6- npm i --save cors 
// Middlewares usam (req, res , next)