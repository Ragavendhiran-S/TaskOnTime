document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const savedTasks = getSavedTasks();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    savedTasks.forEach(task => {
        addTaskToList(task);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const savedTasks = getSavedTasks();
        savedTasks.push(taskText);
        saveTasks(savedTasks);
        addTaskToList(taskText);
        taskInput.value = "";
    }
}

function addTaskToList(taskText) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = taskText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        deleteTask(li, taskText);
    };
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function deleteTask(taskElement, taskText) {
    const savedTasks = getSavedTasks();
    const index = savedTasks.indexOf(taskText);
    if (index !== -1) {
        savedTasks.splice(index, 1);
        saveTasks(savedTasks);
        taskElement.remove();
    }
}

function saveTasks(tasks) {
    document.cookie = `tasks=${JSON.stringify(tasks)}`;
}

function getSavedTasks() {
    const cookie = document.cookie.split(";").find(cookie => cookie.trim().startsWith("tasks="));
    if (cookie) {
        return JSON.parse(cookie.split("=")[1]);
    } else {
        return [];
    }
}



// time
function updateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    };
    const timeString = now.toLocaleTimeString('en-IN', options);
    const [hours, minutes, seconds] = timeString.split(':');
    document.getElementById('hours').textContent = hours % 12;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('amorpm').textContent = hours >= 12 ? 'PM' : 'AM';
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();
