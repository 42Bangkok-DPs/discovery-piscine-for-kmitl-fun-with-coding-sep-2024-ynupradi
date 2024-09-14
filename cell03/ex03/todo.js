document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('ft_list');
    const newButton = document.getElementById('new-todo');

    // โหลดงานจากคุกกี้
    loadTasks();

    // การตั้งค่าการคลิกปุ่ม 'ใหม่'
    newButton.addEventListener('click', () => {
        const taskText = prompt('กรุณาใส่งานใหม่:');
        if (taskText && taskText.trim() !== '') {
            addTask(taskText);
        }
    });

    // ฟังก์ชันในการสร้างองค์ประกอบงานใหม่และเพิ่มไปที่ด้านบนของรายการ
    function addTask(text) {
        const taskElement = document.createElement('div');
        taskElement.className = 'todo-item';
        taskElement.textContent = text;
        taskElement.addEventListener('click', () => {
            const confirmDelete = confirm('คุณแน่ใจหรือไม่ว่าต้องการลบงานนี้?');
            if (confirmDelete) {
                taskElement.remove();
                saveTasks();
            }
        });
        listContainer.insertBefore(taskElement, listContainer.firstChild);
        saveTasks();
    }

    // ฟังก์ชันในการบันทึกงานทั้งหมดลงในคุกกี้
    function saveTasks() {
        const tasks = Array.from(listContainer.children).map(child => child.textContent);
        document.cookie = `tasks=${JSON.stringify(tasks)};path=/`;
    }

    // ฟังก์ชันในการโหลดงานจากคุกกี้
    function loadTasks() {
        const cookies = document.cookie.split('; ').find(row => row.startsWith('tasks='));
        if (cookies) {
            const tasks = JSON.parse(cookies.split('=')[1]);
            tasks.forEach(task => addTask(task));
        }
    }
});