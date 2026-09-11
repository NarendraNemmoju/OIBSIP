/* =========================================
   TASKFLOW TODO APP
   JavaScript Functionality
   ========================================= */


/* =========================================
   DOM ELEMENTS
   ========================================= */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");

const emptyState = document.getElementById("emptyState");
const emptyTitle = document.getElementById("emptyTitle");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");

const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const currentDate =
    document.getElementById("currentDate");


/* =========================================
   APPLICATION STATE
   ========================================= */

let tasks =
    JSON.parse(localStorage.getItem("taskflowTasks")) || [];

let currentFilter = "all";


/* =========================================
   INITIALIZE APPLICATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    displayCurrentDate();

    renderTasks();

    taskInput.focus();

});


/* =========================================
   DISPLAY CURRENT DATE
   ========================================= */

function displayCurrentDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    currentDate.textContent =
        today.toLocaleDateString(
            "en-US",
            options
        );
}


/* =========================================
   ADD TASK
   ========================================= */

function addTask() {

    const taskText =
        taskInput.value.trim();


    // Prevent empty tasks
    if (taskText === "") {

        taskInput.focus();

        return;
    }


    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    tasks.unshift(newTask);


    saveTasks();

    taskInput.value = "";

    renderTasks();

    taskInput.focus();

}


/* =========================================
   EVENT: ADD TASK BUTTON
   ========================================= */

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* =========================================
   EVENT: ENTER KEY
   ========================================= */

taskInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* =========================================
   TOGGLE TASK
   ========================================= */

function toggleTask(taskId) {

    tasks = tasks.map(task => {

        if (task.id === taskId) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });


    saveTasks();

    renderTasks();

}


/* =========================================
   DELETE TASK
   ========================================= */

function deleteTask(taskId) {

    tasks =
        tasks.filter(
            task => task.id !== taskId
        );


    saveTasks();

    renderTasks();

}


/* =========================================
   EDIT TASK
   ========================================= */

function editTask(taskId) {

    const taskElement =
        document.querySelector(
            `[data-id="${taskId}"]`
        );


    if (!taskElement) {
        return;
    }


    const task =
        tasks.find(
            task => task.id === taskId
        );


    if (!task) {
        return;
    }


    const taskTextElement =
        taskElement.querySelector(".task-text");


    const taskActions =
        taskElement.querySelector(".task-actions");


    const editInput =
        document.createElement("input");


    editInput.type = "text";

    editInput.className = "edit-input";

    editInput.value = task.text;

    editInput.maxLength = 100;


    taskTextElement.replaceWith(editInput);

    taskActions.style.display = "none";

    editInput.focus();


    // Select complete text
    editInput.select();


    function saveEdit() {

        const updatedText =
            editInput.value.trim();


        if (updatedText !== "") {

            tasks = tasks.map(item => {

                if (item.id === taskId) {

                    return {
                        ...item,
                        text: updatedText
                    };

                }

                return item;

            });

        }


        saveTasks();

        renderTasks();

    }


    editInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                saveEdit();

            }


            if (event.key === "Escape") {

                renderTasks();

            }

        }
    );


    editInput.addEventListener(
        "blur",
        saveEdit
    );

}


/* =========================================
   GET FILTERED TASKS
   ========================================= */

function getFilteredTasks() {

    switch (currentFilter) {

        case "active":

            return tasks.filter(
                task => !task.completed
            );


        case "completed":

            return tasks.filter(
                task => task.completed
            );


        default:

            return tasks;

    }

}


/* =========================================
   RENDER TASKS
   ========================================= */

function renderTasks() {

    todoList.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    filteredTasks.forEach(task => {

        const listItem =
            document.createElement("li");


        listItem.className =
            `todo-item ${
                task.completed
                    ? "completed"
                    : ""
            }`;


        listItem.dataset.id =
            task.id;


        /* Checkbox */

        const checkbox =
            document.createElement("button");


        checkbox.className =
            "checkbox";


        checkbox.type = "button";

        checkbox.setAttribute(
            "aria-label",
            task.completed
                ? "Mark task as active"
                : "Mark task as completed"
        );


        checkbox.textContent =
            task.completed
                ? "✓"
                : "";


        checkbox.addEventListener(
            "click",
            () => toggleTask(task.id)
        );


        /* Content */

        const content =
            document.createElement("div");


        content.className =
            "task-content";


        const text =
            document.createElement("p");


        text.className =
            "task-text";


        text.textContent =
            task.text;


        content.appendChild(text);


        /* Actions */

        const actions =
            document.createElement("div");


        actions.className =
            "task-actions";


        /* Edit Button */

        const editButton =
            document.createElement("button");


        editButton.className =
            "action-btn edit-btn";


        editButton.type = "button";

        editButton.title = "Edit task";

        editButton.setAttribute(
            "aria-label",
            "Edit task"
        );


        editButton.innerHTML = "✎";


        editButton.addEventListener(
            "click",
            () => editTask(task.id)
        );


        /* Delete Button */

        const deleteButton =
            document.createElement("button");


        deleteButton.className =
            "action-btn delete-btn";


        deleteButton.type = "button";

        deleteButton.title = "Delete task";

        deleteButton.setAttribute(
            "aria-label",
            "Delete task"
        );


        deleteButton.innerHTML = "🗑";


        deleteButton.addEventListener(
            "click",
            () => deleteTask(task.id)
        );


        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        /* Assemble Task */

        listItem.appendChild(checkbox);

        listItem.appendChild(content);

        listItem.appendChild(actions);


        todoList.appendChild(listItem);

    });


    updateEmptyState(filteredTasks);

    updateStatistics();

}


/* =========================================
   EMPTY STATE
   ========================================= */

function updateEmptyState(filteredTasks) {

    if (filteredTasks.length > 0) {

        emptyState.style.display = "none";

        todoList.style.display = "flex";

        return;

    }


    emptyState.style.display = "block";

    todoList.style.display = "none";


    if (currentFilter === "active") {

        emptyTitle.textContent =
            "No active tasks";

        emptyMessage.textContent =
            "Great job! You have no pending tasks.";

    }

    else if (currentFilter === "completed") {

        emptyTitle.textContent =
            "No completed tasks";

        emptyMessage.textContent =
            "Completed tasks will appear here.";

    }

    else {

        emptyTitle.textContent =
            "No tasks yet";

        emptyMessage.textContent =
            "Add your first task and start getting things done.";

    }

}


/* =========================================
   UPDATE STATISTICS
   ========================================= */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const active =
        total - completed;


    totalTasks.textContent =
        total;


    activeTasks.textContent =
        active;


    completedTasks.textContent =
        completed;

}


/* =========================================
   FILTER TASKS
   ========================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            currentFilter =
                button.dataset.filter;


            renderTasks();

        }
    );

});


/* =========================================
   CLEAR COMPLETED TASKS
   ========================================= */

clearCompletedBtn.addEventListener(
    "click",
    () => {

        const completedCount =
            tasks.filter(
                task => task.completed
            ).length;


        if (completedCount === 0) {

            return;

        }


        tasks =
            tasks.filter(
                task => !task.completed
            );


        saveTasks();

        renderTasks();

    }
);


/* =========================================
   LOCAL STORAGE
   ========================================= */

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}