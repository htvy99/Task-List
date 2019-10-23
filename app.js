//Define UI variable
const ui_form = document.querySelector("#taskForm");
const ui_inputTask = document.querySelector("#taskInput");
const ui_submitTask = document.querySelector("#submitTask");
const ui_taskList = document.querySelector(".taskList");
const ui_clearBtn = document.querySelector(".clearTask");

// ----------------------------------------------
// Load event listeners
// DOM Load event
document.addEventListener("DOMContentLoaded", getTasks);
// Add task event
ui_form.addEventListener("submit", addTask);
// Remove task
ui_taskList.addEventListener("click", removeTask);
// Clear task btn
ui_clearBtn.addEventListener("click", clearTask);

// ------------------------------------------------------
// Show task in the ul whenever the DOM is loaded
function getTasks() {
  let taskArray;

  // Check if anything is inside the dom
  if (localStorage.getItem("taskArray") === null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("taskArray"));
  }

  // For each task in the array, we create taskItem in the html file
  taskArray.forEach(function(taskItem) {
    // Create li element & set class name
    const li = document.createElement("li");
    li.className = "taskItem";
    // Create text node & append to the li
    li.appendChild(document.createTextNode(taskItem));
    // Create delete icon & add class
    deleteIcon = document.createElement("i");
    deleteIcon.id = "deleteItem";
    deleteIcon.className = "far fa-times-circle";
    // Append the icon to the li
    li.appendChild(deleteIcon);

    // Append the li to the ul
    ui_taskList.appendChild(li);
  });
}

// -------------------------------------------------
// Add task function
function addTask() {
  // Alert if input is empty
  if (ui_inputTask.value === "") {
    alert("Please add a task");
  }

  // Create li element & set class name
  const li = document.createElement("li");
  li.className = "taskItem";
  // Create text node & append to the li
  li.appendChild(document.createTextNode(ui_inputTask.value));
  // Create delete icon & add class
  deleteIcon = document.createElement("i");
  deleteIcon.id = "deleteItem";
  deleteIcon.className = "far fa-times-circle";
  // Append the icon to the li
  li.appendChild(deleteIcon);

  // Append the li to the ul
  ui_taskList.appendChild(li);

  // Store the new task into local storage
  storeTaskInLocalStorage(ui_inputTask.value);
  // localStorage.setItem("taskArray", ui_inputTask.value);

  // Clear input
  ui_inputTask.value = "";

  // console.log(li);
  // e.preventDefault();
}

// ---------------------------------------------------
// Store task into local storage
function storeTaskInLocalStorage(newTask) {
  let taskArray;

  // Check if anything is inside the dom
  if (localStorage.getItem("taskArray") === null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("taskArray"));
  }

  // Push new task into the array
  taskArray.push(newTask);

  // Reset the local storage w/ added value
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

// --------------------------------------------------------
// Remove task
function removeTask(e) {
  // Target at the remove icon
  if (e.target.id == "deleteItem") {
    // Confirmation
    if (confirm("Are you sure?")) {
      e.target.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement);
    }
  }
}

// ---------------------------------------------------------
// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  // Check if anything is inside the dom & put it into array
  if (localStorage.getItem("taskArray") === null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("taskArray"));
  }

  // Loop through the array & check the text content
  taskArray.forEach(function(task, index) {
    if (taskItem.textContent == task) {
      taskArray.splice(index, 1);
    }
  });

  // Set the LS again
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

// ---------------------------------------------------------
// Clear task
function clearTask() {
  while (ui_taskList.firstChild) {
    ui_taskList.removeChild(ui_taskList.firstChild);
  }

  // Remove task from LS
  localStorage.clear();
}
