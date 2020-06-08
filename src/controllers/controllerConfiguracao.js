const { responseStructs } = require("@qualicorp_digital/utils");
const { responseSuccess } = responseStructs;
const serviceConfiguracao = require("../services/serviceConfiguracao");
const ConfiguracaoModel = require("../models/ambiente");

class ControllerConfiguracoes {

  async listaTodos(req, res) {
    const response = await ConfiguracaoModel.find();
    res.json(response);
  }

  async consulta(req, res) {
    let { ambiente, celula, recurso } = req.params;

    const configuracoes = await serviceConfiguracao.lista({ ambiente, celula, recurso });
    responseSuccess(res, configuracoes);
  }

  async inclui(req, res) {
    let { ambiente, celula, recurso } = req.params;
    let body = req.body;

    let [configuracao] = await ConfiguracaoModel.find({ nome: ambiente });
    let response = undefined;

    if (configuracao.length === 0)
      response = await serviceConfiguracao.incluir({ ambiente, celula, recurso, body })
    else
      response = await serviceConfiguracao.alterar(configuracao, { ambiente, celula, recurso, body });

    res.json(response);
  }
}

module.exports = new ControllerConfiguracoes();
