document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const loadTasksButton = document.getElementById('loadTasksButton');
    const taskList = document.getElementById('taskList');
    const exportButton = document.getElementById('exportButton');

    loadTasksButton.addEventListener('click', () => {
        const tasks = taskInput.value.split(',').map(task => task.trim()).filter(task => task !== '');
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox" id="task${index}"><label for="task${index}">${task}</label>`;
            taskList.appendChild(li);
        });
        taskInput.value = '';
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const label = e.target.nextElementSibling;
            if (e.target.checked) {
                label.classList.add('completed');
            } else {
                label.classList.remove('completed');
            }
        }
    });

    exportButton.addEventListener('click', () => {
        const completedTasks = Array.from(taskList.querySelectorAll('input:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent);
        
        if (completedTasks.length === 0) {
            alert('No hay tareas completadas para exportar.');
            return;
        }

        const tasksText = completedTasks.join('\n');
        const blob = new Blob([tasksText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tareas_completadas.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
