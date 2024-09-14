function addTodoItem(todoText, save = true) {
    if (todoText.trim() === "") return;

    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.textContent = todoText;

    todoItem.addEventListener('click', function() {
        if (confirm("Do you want to remove this item?")) {
            todoItem.remove();
            saveTodos();
        }
    });

    const list = document.getElementById('ft_list');
    list.appendChild(todoItem);

    if (save) {
        saveTodos();
    }
}

document.getElementById('new-todo').addEventListener('click', function() {
    const todoText = prompt("Enter your new TO-DO:");
    if (todoText !== null) {
        addTodoItem(todoText);
    }
});

function saveTodos() {
    const list = document.getElementById('ft_list');
    const todos = [];
    
    for (let i = 0; i < list.children.length; i++) {
        todos.push(list.children[i].textContent);
    }

    const date = new Date();
    date.setTime(date.getTime() + (20 * 365 * 24 * 60 * 60 * 1000)); // ตั้งให้คุกกี้มีอายุ 20 ปี
    const expires = "; expires=" + date.toUTCString();
    
    document.cookie = "todos=" + JSON.stringify(todos) + expires + "; path=/";
}

function loadTodos() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("todos=")) {
            const todoList = JSON.parse(cookie.substring("todos=".length));
            todoList.forEach(function(todoText) {
                addTodoItem(todoText, false);
            });
        }
    }
}

window.onload = loadTodos;