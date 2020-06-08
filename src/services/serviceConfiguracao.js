const ConfiguracaoModel = require("../models/ambiente");
const { AppError } = require("@qualicorp_digital/utils");

class ServiceConfiguracao {
  async lista({ ambiente, celula, recurso }) {

  }

  async alterar(configuracao, { ambiente, celula, recurso, body }) {
    let celulaBuscada = configuracao.celula.find(item => item.nome === celula);

    if (celulaBuscada) {
      let idx = celulaBuscada.recursos.findIndex(item => item.nome === recurso);
      let recursoBuscado = celulaBuscada.recursos[idx];

      if (recursoBuscado) {
        recursoBuscado.conteudo = {
          ...recursoBuscado.conteudo,
          ...body
        };

        celulaBuscada.recursos[idx] = recursoBuscado
      } else {
        const novoRecurso = {
          nome: recurso,
          conteudo: {
            ...body
          }
        };

        celulaBuscada.recursos = [...celulaBuscada.recursos, novoRecurso];
      }


      configuracao.celula = celulaBuscada;
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
    return { id: response.id };
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