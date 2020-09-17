const express = require("express");
const app = express();
const mongoose = require("mongoose")
app.use(express.json());
require("./models/Artigo");
const Artigo = mongoose.model('artigo')
var cors = require('cors')



//========== MIDDLEWARE CORS =================//
app.use((req, res, next) => {
    console.log("Middleware working...")
    res.header("Access-Control-Allow-Origin", "*")// * any app can do req
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    app.use(cors());
    next()
});





//========== DB CONNECT =============//

mongoose.connect('mongodb://localhost/api02db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log(`Connect success with db`)
}).catch((err) => {
    console.log(`Error ----> ${err}`)
})



//========= POST CREATE  ===========//
app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Sem sucesso no cadastro, tente novamente"
        })
        return res.status(200).json({
                error: false,
                message: "Pronto, feitinho!"
            })
            //console.log(`O que foi criado: ${req.body});
            // return res.json(req.body)
    })
});


//========= GET READ ALL ==============//
app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nada consta! Parece estar vazio."
        })

    })

});


//============ GET READ ( =============//

app.get("/artigo/:id", (req, res) => {

    Artigo.findOne({ _id: req.params.id }).then((artigo) => {
        return res.json(artigo);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nada consta!"

        })
    })
});


//=============== PUT UPDATE  ===============//
app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Bahhh,oh meooo, deu ruim! Tente novamente tchee"
        });
        return res.json({
            error: false,
            message: "Sucesso total na missao, ediçao concluida"
        });
    })
});


//============ DELETE =================//
app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Uai so.... ainda ta ai esse trem... tenta denovo uai"
        });
        return res.json({
            error: false,
            message: "Oua, sumiu o trem!"
        });
    })
});






//========= PORT ============//
app.listen(8080, () => {
    console.log(`Server is running at http://localhost:8080/`)
})