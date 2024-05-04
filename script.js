// Function to update the clock
function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var amOrPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('amorpm').innerText = amOrPm;

    setTimeout(updateClock, 1000); // Update every second
}


// Function to add a new task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    var input = document.getElementById("taskInput")
    // input.addEventListener("keypress",function(e)=>{
    //     if(e.key === "Enter") {
    //         event.preventDefault();

    //     }
    // };)
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var taskText = taskInput.value.trim(); // Get the task text
    var li = document.createElement("li");
    li.textContent = taskText+" = ";

    // Create a delete button for the task
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        removeTask(li, taskText); // Pass the task element and task text
    };
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // Save tasks to local storage
    saveTasks();

    taskInput.value = ""; // Clear the task input field after adding task
}

// Function to remove a task
function removeTask(task, taskText) {
    task.parentNode.removeChild(task);

    // Remove the task from local storage
    var savedTasks = getSavedTasks();
    var index = savedTasks.indexOf(taskText);
    if (index !== -1) {
        savedTasks.splice(index, 1);
        saveTasks(savedTasks);
    }
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    if (!tasks) {
        tasks = Array.from(document.querySelectorAll("#taskList li")).map(li => li.textContent);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    var savedTasks = getSavedTasks();
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing tasks
    var deleteBtn = document.getElementById("button")
    savedTasks.forEach(taskText => {
        addTaskToList(taskText);
    });
}

// Function to retrieve saved tasks from local storage
function getSavedTasks() {
    var tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Function to add a task from saved tasks to the task list
function addTaskToList(taskText) {
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = taskText;

    // Create a delete button for the task
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        removeTask(li, taskText); // Pass the task element and task text
    };
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Load tasks from local storage when the page is loaded
window.onload = function() {
    loadTasks();
    updateClock();

    // Clear task input field
    document.getElementById("taskInput").value = "";
};
