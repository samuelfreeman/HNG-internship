const express = require("express");
const app = express();
const greetingRoute = require("./router");
require("dotenv").config();
app.set("trust proxy", true);

app.use("/api", greetingRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
