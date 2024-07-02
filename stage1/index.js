const express = require("express");

const app = express();

const cors = require("cors");

const mainrouter = require("./router");

require("dotenv").config();

app.set("trust proxy", true);

app.use(cors());

app.use("/api", mainrouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
