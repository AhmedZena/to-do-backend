let express = require("express");
let app = express();
let cors = require("cors");
let mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// middleware for cors
app.use(cors());

// middleware to connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/Tasks")
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Error while connecting to mongodb", err);
  });

// middleware to parse json data
app.use(express.json());

// get routing of user
let userRouter = require("./src/routes/users.js");
let todosRouter = require("./src/routes/todos.js");

app.use("/users", userRouter);
app.use("/todos", todosRouter);
app.use("*", function (req, res) {
  res.json({ message: "user was created successfully" });
});

// port and server
let port = process.env.PORT || 3000;
// console.log(process.env);
// console.log(port);
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
