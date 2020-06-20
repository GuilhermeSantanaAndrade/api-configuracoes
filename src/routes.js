const routes = require("express").Router()
const controllerConfiguracao = require("./controllers/controllerConfiguracao")
// eslint-disable-next-line camelcase
const { validateInput_consulta_get, validateInput_inclui_post } = require("./validations/controllers.validation/controllerConfiguracao.validation")

routes.get("/configuracoes/:ambiente/:celula/:recurso", validateInput_consulta_get, controllerConfiguracao.consulta)
routes.get("/configuracoes/:ambiente/:celula", validateInput_consulta_get, controllerConfiguracao.consulta)
routes.post("/configuracoes/:ambiente/:celula/:recurso", validateInput_inclui_post, controllerConfiguracao.inclui)
routes.get("/configuracoes", controllerConfiguracao.listaTodos)

module.exports.routes = routes
