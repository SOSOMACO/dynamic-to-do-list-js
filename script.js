document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  loadTasks();

  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      saveTaskToLocalStorage(taskText);
      taskInput.value = "";
    } else {
      alert("Please enter a task.");
    }
  });

  taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = "";
      } else {
        alert("Please enter a task.");
      }
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      removeTaskFromLocalStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach(taskText => addTask(taskText));
  }
});
