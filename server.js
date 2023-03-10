const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema/index");
const root = require("./graphql/resolvers/index");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://what-the-vox.onrender.com"],
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use("/", (req, res) => {
  res.send("Hello!");
});

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
