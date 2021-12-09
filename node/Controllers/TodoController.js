const connToDb = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService")
const {ObjectId, MongoClient} = require("mongodb")
const TodoService = require("../Services/TodoService")

let TodoController = {
    getAllCompletedTodos: async (req, res) => {
        let completedTodoObj = {}

        connToDb(async (db) => {
            let result = await TodoService.getAllCompletedTodos(db, completedTodoObj)
            res.json(JsonResService(result))
        })
    },

    getAllUncompletedTodos: async (req, res) => {
        let uncompletedTodoObj = {}

        connToDb(async (db) => {
            let result = await TodoService.getAllUncompletedTodos(db, uncompletedTodoObj)
            res.json(JsonResService(result))
        })
    },

    addTodo: async (req, res) => {
    const taskToAdd = {
        description: req.body.description,
        completed: false
    }

        connToDb(async (db) => {
            let result = await TodoService.addTodo(db, taskToAdd)
            if(result.acknowledged) {
                res.json(JsonResService(result))
            } else {
                res.json(JsonResService(result))
            }
        })
    },

    markAsCompleted: (req, res) => {

        const id = ObjectId(req.params.id)

        connToDb(async (db) => {
            let result = await TodoService.markAsCompleted(db, id)
            if(result.acknowledged) {
                res.json(JsonResService(result))
            } else {
                res.json(JsonResService(result))
            }
        })
    },

    addTag: (req, res) => {

        const id = ObjectId(req.body.id)
        let tag = req.body.tags

        connToDb(async (db) => {
            let result = await TodoService.addTag(db, id, tag)
            if(result.acknowledged) {
                res.json(JsonResService(result))
            } else {
                res.json(JsonResService(result))
            }
        })
    },

    deleteTodo: (req, res) => {

        const id = ObjectId(req.params.id)

        connToDb(async (db) => {
            let result = await TodoService.deleteTodo(db, id)
            if(result.acknowledged) {
                res.json(JsonResService(result))
            } else {
                res.json(JsonResService(result))
            }
        })
    }
}

module.exports = TodoController