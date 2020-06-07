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
    // let { ambiente, celula, nivel } = req.params;

    // const configuracoes = await serviceConfiguracao.lista({ celula, nivel });
    // responseSuccess(res, configuracoes);
  }

  async inclui(req, res) {
    // let { ambiente, celula, nivel } = req.params;
    // let { body } = req.body;

    // const configuracoes = await serviceConfiguracao.inclui({ celula, nivel, body });
    let model = undefined

    const config = await ConfiguracaoModel.find({ nome: "dev" });

    if (!config.length) {
      model = new ConfiguracaoModel();
      model.nome = "dev";
      const recurso = [{
        nome: "api-corretoras",
        conteudo: {
          API_PORT: 3002,
          NODE_ENV: "development",
          MONGO_HOST: "192.168.99.100",
          MONGO_PORT: 27017,
          MONGO_NAME: "qualicorp_configs",
          MONGO_USER: "admin",
          MONGO_PASS: "admin"
        }
      }];
      model.celula = [{
        nome: "celula_digital",
        recurso: recurso
      }]
    } else {
      [model] = config;
      model.celula.push({ nome: "qualitech", recurso: [] })
    };

    const response = await ConfiguracaoModel.findOneAndUpdate({ nome: "dev" }, model, { upsert: true });
    res.json(response);
  }
}

module.exports = new ControllerConfiguracoes();
