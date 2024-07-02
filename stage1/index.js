const express = require("express");

const app = express();

const cors = require("cors");

const mainrouter = require("./router");

require("dotenv").config();

app.use(cors());

app.use((error, req, re));

app.use("/api", mainrouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
