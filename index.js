const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "Auction App build with Node.js, Express, and Postgre Api",
  });
});

app.get("/users", db.getUsers);
app.get("/users/:userName", db.getUserByUserName);
app.post("/users", db.createUser);
app.put("/users/:userName", db.updateUser);
app.delete("/users/:userName", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
