// get todos
const getUncompletedTodos = async () => {
    let result = await fetch('http://localhost:3000/')
    let todos = await result.json()
    return todos
}

const getCompletedTodos = async () => {
    let result = await fetch('http://localhost:3000/completed')
    let todos = await result.json()
    return todos
}

// display todos
const displayUncompletedTodos = (todos) => {
    let result = ''
    todos.data.forEach(function(todo){
        result += `<div class="uncompleted-row"><input type="checkbox" class="uncompleted-todo" data-id="${todo._id}"> ${todo.description}</input></div>`
        result += `<div class="tag-functionality">`
        if(todo.tags)
            todo.tags.forEach((tag) => {
                result += `<div class="tag">${tag}</div>`
            })
        result += `<div class="add-tag-container">`
        result += `<input class="addTag" data-id="${todo._id}" type="text"/>`
        result += `<button class="addTagButton">Add tag</button>`
        result += `</div>`
        result += `<div class="tag-container">`
        result += `</div></div>`
        })
    document.getElementById('uncompleted-tasks-container').innerHTML = result
}

const displayCompletedTodos = (todos) => {
    let result = ''
    todos.data.forEach(function(todo){
        result += `<p class="completed-todo" data-id="${todo._id}">${todo.description}</p>`
    })
    document.getElementById('completed-tasks-container').innerHTML = result
}

// add tags
const addTag = async (id, value) => {
    let result = await fetch('http://localhost:3000/tags', {
        method: "PUT",
        body: JSON.stringify({id: id, tags: value}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => buildPage())
}

const addTagButtonEventListener = () => {
    document.querySelectorAll('.addTagButton').forEach((button) => {
        button.addEventListener('click', (e) => {
            console.log(e.target.previousSibling.value)
            let tagInputId = e.target.previousSibling.dataset.id
            let tagInputValue = e.target.previousSibling.value
            addTag(tagInputId, tagInputValue)
        })
    })
}

// add event listener to each uncompleted to do, and run function completeTodo on click
const addCompletedEventListener = () => {
    let uncompletedTodos = document.querySelectorAll('.uncompleted-todo')
    uncompletedTodos.forEach(function(todo){
        todo.addEventListener('click',(e) => {
            completeTodo(e.target.dataset.id)
        })
    })
}

const completeTodo = async (id) => {
    let result = await fetch(`http://localhost:3000/done/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
    buildPage()
}

// add event listener to each completed to do, and run function deleteCompletedTodo on click (to permanently delete)
const addDeleteCompletedEventListener = () => {
    let completedTodos = document.querySelectorAll('.completed-todo')
    completedTodos.forEach(function(todo){
        todo.addEventListener('click', (e) => {
            deleteCompletedTodo(e.target.dataset.id)
        })
    })
}

const deleteCompletedTodo = async (id) => {
    let result = await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    buildPage()
}

// add event listener to add button and run function submitTodo on click
const addTodoEventListener = () => {
    let button = document.getElementById('add-button')
    button.addEventListener('click', (e) => {
        let description = document.getElementById('new-todo-description').value
        submitTodo(description)
        document.getElementById("new-todo-description").reset() // this doesn't work - need to work out how to reset
    })
}

// send the form input to the db
const submitTodo = async (description) => {
    let result = await fetch('http://localhost:3000/add', {
        method: "POST",
        body: JSON.stringify({description: description}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    buildPage()
}


const buildPage = async () => {
    let completedTodos = await getCompletedTodos()
    displayCompletedTodos(completedTodos)
    let uncompletedTodos = await getUncompletedTodos()
    displayUncompletedTodos(uncompletedTodos)
    addCompletedEventListener()
    addDeleteCompletedEventListener()
    addTagButtonEventListener()
    christmasCounter()
    document.getElementById('new-todo-description').value = ''
}

buildPage()
addTodoEventListener()

// stressful countdown counter
const christmasCounter = () => {
    let countDownDate = new Date("Dec 24, 2021 07:00:00").getTime();

    let x = setInterval(function() {

        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById("countdown").innerHTML = "Only " + days + " days " + hours + " hours "
            + minutes + " min " + seconds + " sec " + "left";

        // Set what to do when the countdown finishes
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "IT'S CHRISTMAS!!!";
        }
    }, 1000);
}
