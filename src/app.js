const { setupEnvironment, responseStructs, AppError, middlewares } = require("@qualicorp_digital/utils")
setupEnvironment();
require("./database/conexao");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const { routes } = require("./routes");
const { responseError, getErrorMessage } = responseStructs;

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(middlewares.handle404);
app.use((error, req, res, _) => {
  // Todos os erros da aplicação são tratados aqui
  const msg = getErrorMessage(error);

  if (error instanceof AppError) {
    responseError(res, msg, 400)
  } else {
    responseError(res, msg, 500);
  }
});

module.exports = app;
