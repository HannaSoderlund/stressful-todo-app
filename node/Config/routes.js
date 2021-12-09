// nice and neat for all the routes

const TodoController = require("../Controllers/TodoController")

function routes(app) {
    app.get('/', TodoController.getAllUncompletedTodos)

    app.get('/completed', TodoController.getAllCompletedTodos)

    app.post('/add', TodoController.addTodo)

    app.put('/done/:id', TodoController.markAsCompleted)

    app.put('/tags', TodoController.addTag)

    app.delete('/delete/:id', TodoController.deleteTodo)
}

module.exports = routes