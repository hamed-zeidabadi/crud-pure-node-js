const http = require("http");
const url = require("url");
const fs = require("fs");
const lookup = require("mime-types").lookup;
const {
  getAllTodo,
  getTodoByUserId,
  createTodo,
  updateTodoById,
  deleteTodoById,
} = require("./controllers/todoController");
const {
  getAllUser,
  getUserById,
  createUser,
  loginUser,
} = require("./controllers/userController");

const server = http.createServer((req, res) => {
  //allow CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
  };
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  //handle request for send static file

  // handle request for api
  if (req.url === "/api/todo" && req.method === "GET") {
    getAllTodo(req, res);
  } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getTodoByUserId(req, res, id);
  } else if (req.url === "/api/todo" && req.method === "POST") {
    createTodo(req, res);
  } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateTodoById(req, res, id);
  } else if (
    req.url.match(/\/api\/todo\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteTodoById(req, res, id);
  } else if (req.url === "/api/user" && req.method === "GET") {
    getAllUser(req, res);
  } else if (req.url.match(/\/api\/user\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getUserById(req, res, id);
  } else if (req.url === "/api/user" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url === "/api/login" && req.method === "POST") {
    loginUser(req, res);
  } else {
    // res.setHeader("Content-Type", "text/html");
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
    if (path == "") {
      path = "index.html";
    }

    let file = __dirname + "/public/" + path;
    fs.readFile(file, (err, content) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
      } else {
        res.setHeader("X-Content-Type-Options", "nosnif");
        let mime = lookup(path);
        res.writeHead(200, { "Content-Type": mime });

        res.end(content);
      }
    });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on ${PORT}`));
