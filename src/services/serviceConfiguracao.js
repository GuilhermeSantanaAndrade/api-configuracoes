const { AppError } = require("@qualicorp_digital/utils");
const fs = require("fs");

class ServiceConfiguracao {
  async lista({ ambiente, celula, nivel }) {

  }

  async incluir({ ambiente, celula, nivel, body }) {
    const fileWriter = fs.promises;
    console.log(fileWriter);
  }
}

module.exports = new ServiceConfiguracao();