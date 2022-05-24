const express = require("express");
const config = require("config");

const app = express();

app.use(express.json());

app.use("/api/user", require("./router/user"));
app.use("/api/health", require("./router/health"));
app.use("/api/post", require("./router/post"));
// TODO: post API

app.get("/", (req, res) => {
  res.send("OK");
});

const port = config.get("app.port");
app.listen(port, () => {
  console.log(`start at ${port}`);
});
