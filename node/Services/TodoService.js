const TodoService = {

    getAllUncompletedTodos: async (db, uncompletedTodoObj) => {
        const christmastodos = db.collection('christmastodos')
        const result = await christmastodos.find({completed: false}).toArray()
        return result
    },

    getAllCompletedTodos: async (db, completedTodoObj) => {
        const christmastodos = db.collection('christmastodos')
        const result = await christmastodos.find({completed: true}).toArray()
        return result
    },

    addTodo: async (db, taskToAdd) => {
        const christmastodos = db.collection('christmastodos')
        const result = await christmastodos.insertOne(taskToAdd)
        return result
    },

    markAsCompleted: async (db, id) => {
        const christmastodos = db.collection('christmastodos')
        const result = await christmastodos.updateOne({_id: id}, {$set: { completed: true }})
        return result
    },

    addTag: async (db, id, tag) => {
        const christmastodos = db.collection('christmastodos')
        const result = await christmastodos.updateOne({_id: id}, { $push: { tags: tag }})
        return result
    },

    deleteTodo: async (db, id) => {
        const christmastodos = db.collection('christmastodos')
        const result = await christmastodos.deleteOne({_id: id})
        return result
    }
}

module.exports = TodoService