/*
  addNewTodo,
  getTodos,
  editTodo,
  deleteTodo,
*/

const TodoModel = require("../models/todos");
const addNewTodo = async (req, res) => {
  try {
    const newTodo = await TodoModel.create(req.body);
    res.status(201).json({ message: "todo was created successfully", newTodo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "todo was not created", error: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "todos were not found", error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.user);
    /*{
  userId: '65a7c43413dc4a605e5069dd',
  username: 'mona soliman',
  role: 'user',
  iat: 1705577794,
  exp: 1705581394
}
*/
    //     const deleteTodo = await TodoModel.findByIdAndDelete(id);
    //     if (deleteTodo) {
    //       return res
    //         .status(200)
    //         .json({ message: "todo was deleted successfully", deleteTodo });
    //     }
    //     res.status(404).json({ message: "todo was not found" });
    //   } catch (error) {
    //     res.status(500).json({ message: "todo was not deleted", error });
    //   }

    // if role is admin , delete any todo

    if (req.user.role === "admin") {
      const deleteTodo = await TodoModel.findByIdAndDelete(id);
      if (deleteTodo) {
        return res
          .status(200)
          .json({ message: "todo was deleted successfully", deleteTodo });
      }
      res.status(404).json({ message: "todo was not found" });
    } else {
      res.status(401).json({ message: "you are not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "todo was not deleted", error });
  }
};

const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    let body = req.body;
    // const updatedUser = await UserModel.findByIdAndUpdate(id, body);

    const updatedTodo = await TodoModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });

    if (updatedTodo) {
      return res
        .status(200)
        .json({ message: "todo was updated successfully", updatedTodo });
    }
    res.status(404).json({ message: "todo was not found" });
  } catch (error) {
    res.status(500).json({ message: "todo was not updated", error });
  }
};

module.exports = {
  addNewTodo,
  getTodos,
  editTodo,
  deleteTodo,
};
