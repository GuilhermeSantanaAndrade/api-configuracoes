const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nome: String,
  celula: [{
    nome: String,
    recursos: [{
      nome: String,
      conteudo: mongoose.Schema.Types.Mixed
    }]
  }]
})

module.exports = mongoose.model('configuracoes', schema);
