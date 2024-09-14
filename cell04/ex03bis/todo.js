
    $(document).ready(function() {
    function addTodoItem(todoText, save = true) {
        if ($.trim(todoText) === "") return;

        const $todoItem = $('<div></div>', {
            class: 'todo-item',
            text: todoText
        }).on('click', function() {
            if (confirm("Do you want to remove this item?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $('#ft_list').append($todoItem);

        if (save) {
            saveTodos();
        }
    }

    $('#new-todo').on('click', function() {
        const todoText = prompt("Enter your new TO-DO:");
        if (todoText !== null) {
            addTodoItem(todoText);
            console.log(1)
        }
    });

    function saveTodos() {
        const todos = $('#ft_list .todo-item').map(function() {
            return $(this).text();
        }).get();

        const date = new Date();
        date.setTime(date.getTime() + (20 * 365 * 24 * 60 * 60 * 1000)); // ตั้งให้คุกกี้มีอายุ 20 ปี
        const expires = "; expires=" + date.toUTCString();

        document.cookie = "todos=" + JSON.stringify(todos) + expires + "; path=/";
    }

    function loadTodos() {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const trimmedCookie = cookie.trim();
            if (trimmedCookie.startsWith("todos=")) {
                const todoList = JSON.parse(trimmedCookie.substring("todos=".length));
                todoList.forEach(todoText => {
                    addTodoItem(todoText, false);
                });
            }
        });
    }
    window.onload = loadTodos();
});