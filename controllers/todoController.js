const Todo = require("./../models/todoModel");

// get all todo =>  api/todo : @GET
const getAllTodo = async (req, res) => {
  try {
    const allTodo = await Todo.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allTodo));
  } catch (error) {
    console.log(error);
  }
};
// get todo by id => api/todo/id  : @GET
const getTodoByUserId = async (req, res, id) => {
  try {
    const todo = await Todo.findByUserID(id);
    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo Not Found !" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    }
  } catch (error) {
    console.log(error);
  }
};
// create new todo => api/todo/  : @POST
const createTodo = async (req, res) => {
  try {
    let body = "";
    req.on("data", (c) => {
      body += c.toString();
    });

    req.on("end", async () => {
      const { title, todo, isActive } = JSON.parse(body);
      const newTodo = {
        title,
        todo,
        isActive,
      };
      const createTodo = await Todo.create(newTodo);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(createTodo));
    });
  } catch (error) {
    console.log(error);
  }
};
// update todo =>  api/todo/ : @PATCH
const updateTodoById = async (req, res, id) => {
  try {
    const todoItems = await Todo.findByID(id);
    if (!todoItems) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo Not Found !" }));
    } else {
      let body = "";
      req.on("data", (c) => {
        body += c.toString();
      });
      req.on("end", async () => {
        const { title, todo, isActive } = JSON.parse(body);
        const newTodo = {
          title: title || todoItems.title,
          todo: todo || todoItems.todo,
          isActive: isActive || todoItems.isActive,
        };
        const updateTodo = await Todo.update(id, newTodo);
        await res.writeHead(201, { "Content-Type": "application/json" });
        await res.end(JSON.stringify(updateTodo));
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// delete todo =>  api/todo/ : @DELETE
const deleteTodoById = async (req, res, id) => {
  try {
    const todoItems = await Todo.findByID(id);
    if (!todoItems) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo Not Found !" }));
    } else {
      await Todo.remove(id);
      await res.writeHead(201, { "Content-Type": "application/json" });
      await res.end(JSON.stringify({ message: `${id} removed !` }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTodo,
  getTodoByUserId,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
