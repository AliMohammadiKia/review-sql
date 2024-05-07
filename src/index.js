const express = require("express");
const db = require("./db/connection");

const authorRouter = require("./routes/author.routes");

const app = express();

app.use(express.json());
app.use("/authors", authorRouter);

const start = async () => {
  console.clear();

  await db.getConnection(); // connection test
  console.log("connected to database 🎉");

  app.listen(5000, () => {
    console.log("app is running on port 5000");
  });
};

start();
