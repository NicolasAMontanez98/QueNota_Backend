const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.set("port", process.env.PORT || 8000);

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/student", require("./routes/student"));
app.use("/api/course", require("./routes/course"));
app.use("/api/homework", require("./routes/homework"));
app.use("/api/note", require("./routes/note"));

module.exports = app;
