const ConfiguracaoModel = require("../models/ambiente")

class ServiceConfiguracao {
  async lista({ ambiente, celula, recurso }) {
    const response = []
    const [configuracaoBuscada] = await ConfiguracaoModel.find({ nome: ambiente })
    if (configuracaoBuscada) {
      const [celulaBuscada] = configuracaoBuscada.celula.find(item => item.nome === celula)

      if (celulaBuscada) {
        xxx
      }
    }

    return response
  }

  async alterar(configuracao, { ambiente, celula, recurso, body }) {
    const celulaBuscada = configuracao.celula.find(item => item.nome === celula)

    if (celulaBuscada) {
      const idx = celulaBuscada.recursos.findIndex(item => item.nome === recurso)
      const recursoBuscado = celulaBuscada.recursos[idx]

      if (recursoBuscado) {
        recursoBuscado.conteudo = {
          ...recursoBuscado.conteudo,
          ...body
        }

        celulaBuscada.recursos[idx] = recursoBuscado
      } else {
        const novoRecurso = {
          nome: recurso,
          conteudo: {
            ...body
          }
        }

        celulaBuscada.recursos = [...celulaBuscada.recursos, novoRecurso]
      }

      configuracao.celula = celulaBuscada
    } else {
      const novaCelula = {
        nome: celula,
        recursos: [{
          nome: recurso,
          conteudo: {
            ...body
          }
        }]
      }

      configuracao.celula = [...configuracao.celula, novaCelula]
    };

    const response = await ConfiguracaoModel.findOneAndUpdate({ nome: ambiente }, configuracao, { upsert: true })
    return { id: response.id }
  }

  async incluir({ ambiente, celula, recurso, body }) {
    const configuracao = new ConfiguracaoModel()
    configuracao.nome = ambiente
    const recursos = [{
      nome: recurso,
      conteudo: {
        ...body
      }
    }]
    configuracao.celula = [{
      nome: celula,
      recursos: recursos
    }]

    const response = await configuracao.save()
  }
}

module.exports = new ServiceConfiguracao()
