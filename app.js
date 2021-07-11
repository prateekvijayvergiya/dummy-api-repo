const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/router");
const cors = require("cors");
const logger = require("morgan");
app.use(cors());

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(logger('tiny'));

mongoose.connect("mongodb://localhost/task", { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);

let db = mongoose.connection;
db.on("error", console.error.bind);
db.once("open", function() {
  // we're connected!
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const port = process.env.port || 8080
const port = "5000";
app.use("/api", router);
app.listen(port);

// console.log('Magic happens on port ' + port);
