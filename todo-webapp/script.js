document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taskForm');
    const taskList = document.getElementById('task-list');
    const formTitle = document.getElementById('task-header');
    const formButton = document.getElementById('task-btn');
    const tableTitle = document.getElementById('table-header');
    const filter = document.getElementById('filter');
    let selectedRow = null;
    let isEdited = false;
    let isFiltered = false;

    // Load tasks from localStorage
    loadTasks();

    form.addEventListener('submit', function(e) {
        // Prevents default behaviour on submission
        e.preventDefault();

        // Get form values
        const taskNameInput = document.getElementById('task-name');
        const taskDescriptionInput = document.getElementById('task-description');

        const taskName = taskNameInput.value;
        const taskDescription = taskDescriptionInput.value;

        // Condition to check whether input fields have non-empty values
        if(taskName && taskDescription) {
            if (selectedRow === null) {
                // Add task to table
                addTask(taskName, taskDescription, "Pending");

                // Save task to localStorage
                saveTask(taskName, taskDescription, "Pending");    
            } else {
                updateTask(selectedRow, taskName, taskDescription, "Pending");
                updateLocalStorage(taskName, taskDescription, selectedRow.rowIndex - 1);
                selectedRow = null;
                isEdited = false;

                formTitle.innerText = 'Add Task';
                formButton.innerText = 'Add'
            }
            
            // Clears input fields
            taskNameInput.value = '';
            taskDescriptionInput.value = '';
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
            selectedRow = e.target.parentElement.parentElement;
            document.getElementById('task-name').value = selectedRow.children[0].textContent;
            document.getElementById('task-description').value = selectedRow.children[1].textContent;

            formTitle.innerText = 'Edit Task';
            formButton.innerText = 'Edit';
        } else if (e.target.classList.contains('delete-btn')) {
            const row = e.target.parentElement.parentElement;
            deleteTask(row.rowIndex - 1);
            row.remove();
        } else if (e.target.classList.contains('complete-btn')) {
            const row = e.target.parentElement.parentElement;
            const status = row.children[2];

            const newStatus = status.textContent === 'Pending' ? 'Completed' : 'Pending';
            status.textContent = newStatus;

            newStatus === 'Pending' ? 'Completed' : 'Undo';


            updateLocalStorageStatus(row.children[0].textContent, row.children[1].textContent, newStatus, row.rowIndex -1);
        }
    });

    filter.addEventListener('change', function() {
        const filterValue = this.value;
        const rows = taskList.querySelectorAll('tr');

        rows.forEach(row => {
            const state = row.children[2].textContent.toLowerCase();

            if (filterValue === 'all' || state === filterValue) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });

        if (filterValue === 'all') {
            tableTitle.innerText = 'All';
        } else if (filterValue === 'pending') {
            tableTitle.innerText = 'Pending';
        } else if (filterValue === 'completed') {
            tableTitle.innerText = 'Completed';
        }

    });

    function loadTasks() {
        // Get task from localStorage or initialise an array and give it the name "tasks".
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Ensure tasks is an array
        if (!Array.isArray(tasks)) {
            tasks = [];
        }

        // Calls addTask() for each saved task to repopulate the table.
        tasks.forEach(task => {
            addTask(task.taskName, task.taskDescription, task.state);
        });

    }

    function addTask(taskName, taskDescription, state) {
        // Creates a new row (<tr>) with the task details and action buttons.
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${taskName}</td>
            <td>${taskDescription}</td>
            <td>${state}</td>
            <td>
                <a type="button" class="edit-btn view-task-btn">Edit</a>
                <a type="button" class="delete-btn view-task-btn">Delete</a>
                <a type="button" class="complete-btn view-task-btn">Complete</a>
            </td>
        `;
        
        // Appends the row to the task list.
        taskList.appendChild(row);
    }

    function saveTask(taskName, taskDescription, state) {
        // Retrieves the existing tasks from localStorage, or initializes an empty array if none exist.
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Ensure tasks is an array
        if (!Array.isArray(tasks)) {
            tasks = [];
        }

        // Adds the new task to the array.
        tasks.push({taskName, taskDescription, state});

        // Saves the updated tasks array back to localStorage.
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    function updateTask(row, taskName, taskDescription, state) {
        row.children[0].textContent = taskName;
        row.children[1].textContent = taskDescription;
        row.children[2].textContent = state;
    }

    function updateLocalStorage(taskName, taskDescription, index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks[index] = {taskName, taskDescription, state: "Pending"};

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateLocalStorageStatus(taskName, taskDescription, state, index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks[index] = {taskName, taskDescription, state};

        localStorage.setItem('tasks', JSON.stringify(tasks));
        
    }

    function deleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Ensure tasks is an array
        if (!Array.isArray(tasks)) {
            tasks = [];
        }

        tasks.splice(index, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

