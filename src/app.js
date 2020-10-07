const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

module.exports = app;
