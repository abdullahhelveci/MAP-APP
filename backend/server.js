const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb ile server bağlantı kurdu");
  })
  .catch((err) => {
    console.log("mongodb ile server bağlantı kuramadı :(", err);
  });

app.listen(process.env.PORT, () => {
  console.log("port dinlemeye alındı");
});
