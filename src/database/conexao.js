const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_NAME,
} = process.env;
const connectUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`;

mongoose.connect(connectUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", () => console.error("Mongo erro de conexão."));
mongoose.connection.once("open", () =>
  console.log(`Mongo conectado. ${connectUrl}`)
);
