document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // Load tasks from localStorage
  loadTasks();

  // Add task on button click
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

  // Add task on Enter key
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
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

  // Function to add task to the list
  function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    removeBtn.onclick = () => {
      li.remove();
      removeTaskFromLocalStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  // Save task to localStorage
  function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove task from localStorage
  function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText));
  }
});
