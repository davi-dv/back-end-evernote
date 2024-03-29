const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

//mongoose faz conexão com banco mongodb
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));
