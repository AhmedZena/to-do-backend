const express = require("express");
const router = express.Router();

/*
post	/users	- Register a user with the following required attributes Username,password , firstName, lastName
Notes: 
- Handle validation errors returned from mongo 
GET	/users	Return the first name of registered users
DELETE	/users/:id	Delete the user with selected id 

PATCH	/users/:id	- Edit the user with the selected id 
- Return ({message:”user was edited successfully”, user: theUserAfterEdit”}) if success
- Handle validation errors returned from mongo 

GET	/users/:userId/todos	Return the todos of specific user

*/

const {
  register,
  getUsers,
  deleteUser,
  editUser,
  login,
} = require("../controllers/users");

// router.post("/", register);
// router.get("/", getUsers);
// router.delete("/:id", deleteUser);
// router.patch("/:id", editUser);
// router.get("/:userId/todos", getUserTodos);

router.route("/").post(register).get(getUsers);
router.route("/:id").delete(deleteUser).patch(editUser);

// router.route("/:userId/todos").get(getUserTodos);

// login route
router.post("/login", login);

module.exports = router;
