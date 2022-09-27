const http = require('http');
const { getAllTodo } = require('./controllers/todoController');
const server = http.createServer((req, res) => {
    if (req.url === '/api/todo' && req.method === 'GET') {
        getAllTodo(req, res)
    }
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on ${PORT}`));