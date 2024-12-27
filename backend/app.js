const express = require("express");
const app = express();
const cors = require("cors");
const pinsRouter = require("./routes/pinsRouter.js");
const userRouter = require("./routes/userRouter.js");

app.use(cors());

app.use(express.json());

app.get("/api/location", (req, res) => {
  res.status(200).json({ message: "lokasyon bağlantısı başarılı" });
});

app.use("/api/pins", pinsRouter);
app.use("/api/users", userRouter);

module.exports = app;
