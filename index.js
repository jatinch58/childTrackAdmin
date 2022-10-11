require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routers/index");
app.use(cors());
app.use(express.json());
app.use(routes);
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected sucessfully");
  })
  .catch((e) => {
    console.log(e.name);
  });
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
