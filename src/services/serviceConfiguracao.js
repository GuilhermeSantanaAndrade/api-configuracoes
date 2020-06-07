const ConfiguracaoModel = require("../models/ambiente");
const { AppError } = require("@qualicorp_digital/utils");

class ServiceConfiguracao {
  async lista({ ambiente, celula, recurso }) {

  }

  async alterar(configuracao, { ambiente, celula, recurso, body }) {
    let celulaBuscada = configuracao.celula.find(item => item.nome === celula);

    if (celulaBuscada) {

    } else {
      let novaCelula = {
        nome: celula,
        recursos: [{
          nome: recurso,
          conteudo: {
            ...body
          }
        }]
      };

      configuracao.celula = [...configuracao.celula, novaCelula]
    };

    const response = await ConfiguracaoModel.findOneAndUpdate({ nome: ambiente }, configuracao, { upsert: true });
  }

  async incluir({ ambiente, celula, recurso, body }) {

    const configuracao = new ConfiguracaoModel();
    configuracao.nome = ambiente;
    const recursos = [{
      nome: recurso,
      conteudo: {
        ...body
      }
    }];
    configuracao.celula = [{
      nome: celula,
      recursos: recursos
    }];

    const response = await configuracao.save();
  }
}

module.exports = new ServiceConfiguracao();