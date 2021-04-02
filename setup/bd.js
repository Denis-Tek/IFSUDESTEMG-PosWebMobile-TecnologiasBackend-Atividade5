const mongoose   = require('mongoose');

const cluster    = 'clusterposwebmobile.qp8pz.mongodb.net';
const bd         = 'bd_comentarios';
const user       = 'denis';
const password   = process.env.PASS_MONGODB;
const URLConexao = `mongodb+srv://${user}:${password}@${cluster}/${bd}?retryWrites=true&w=majority`;
const options    = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose
    .connect(URLConexao, options)
    .then(() => console.log(" Estamos conectados ao MongoDB!\n"))
    .catch(erro => console.log(" *** Erro ao conectar ao MongoDB: " + erro));