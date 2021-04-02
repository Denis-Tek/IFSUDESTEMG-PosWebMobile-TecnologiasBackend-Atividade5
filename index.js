// CARREGAMENTO DE MÓDULOS DO NODE
const express    = require('express');
const bodyparser = require('body-parser');
const path       = require('path');
const app        = express();

// REALIZANDO CONEXÃO AO MONGO DB NA NUVEM
require('./setup/bd');

// CARREGAMENTO DE ROTAS DA APLICAÇÃO
const comentarios = require('./routes/comentario.js');

// ROTAS REDIRECIONADAS PERMANENTEMENTE
app.get('/', (req, res) => {
  res.writeHead(301, {'Location': '/comentario'});
  res.end();
});

app.get('/favicon.ico', (req, res) => {
  res.writeHead(301, {'Location': '/public/favicon.ico'});
  res.end();   
}); 

// MIDDLEWARES (PLUGINS)
const middlewareRegistraRequisicao = function (req, res, next) {
  let inicio   = Date.now();
  let dhInicio = new Date(inicio);
  //req.request_time = dInicio;
  console.log(dhInicio.toUTCString() + ' => ' + req.method + ': ' + decodeURI(req.path));
  //console.log(req.headers);
  next();
  console.log('Tempo de processamento da rota: ' + (Date.now() - inicio) + ' milissegundo(s)\n');        
}

const middlewareNotFound = function (req, res, next) {
  res.status(404).send("Não tente invadir o meu site. Esta rota não existe! Seu IP foi registrado.");
  res.end();
  console.log(`   **** Um mané com IP ${req.ip} tentou acessar rota inexistente ${req.method}: ${decodeURI(req.path)}`);
} 

// REGISTRO DOS MIDDLEWARES
app.use(middlewareRegistraRequisicao);
app.use('/public', express.static(__dirname + '/public')); 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(comentarios);
app.use(middlewareNotFound);

// REGISTRO DE ENGINE DE TEMPLATE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

// ATIVAÇÃO DO SERVIDOR
const port = 3000;
app.listen(port, ()=> console.log(`\n Servidor atendendo na porta ${port}!\n`));