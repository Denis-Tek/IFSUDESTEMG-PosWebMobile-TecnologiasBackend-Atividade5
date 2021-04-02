const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();

const Comentario = require('../models/comentario');

// VIEWS
router.get('/comentario', (req, res) => {
  res.render("comentario");
});
  
// POST
router.post('/comentario', (req, res) => {
  console.log(req.body);

  Comentario.findOne(
    {usuario:    req.body.usuario,
     email:      req.body.email,
     comentario: req.body.comentario})
    .then(documento => {
      if (documento) {
        return res.status(409).json({error: `${req.body.usuario}, você já postou este comentário em ${documento.momento}!`})
      } else {        

        // Criptografando senha
        const custoProcessamentoCriptografia = 10;
        bcrypt.genSalt(custoProcessamentoCriptografia, (erro, salt) => {
          bcrypt.hash(req.body.senha, salt, (erro, hash) => {
            
            if (erro) throw erro;
            let SenhaCriptografada = hash;             

            Comentario({
              usuario:    req.body.usuario,
              email:      req.body.email,
              comentario: req.body.comentario,
              senha:      SenhaCriptografada
            })
            .save()
            .then(documento_gravado => res.json(documento_gravado))
            .catch(erro => console.log("*** Erro ao tentar gravar documento: " + erro));            

          });
        });               

      }       
     }
    )
    .catch(erro => console.log("*** Erro ao tentar localizar documento: " + erro));
});

module.exports = router;