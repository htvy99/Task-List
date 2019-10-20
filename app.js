// Define UI variable
const form = document.querySelector("#taskForm");
const taskList = document.querySelector(".taskList");
const clearBtn = document.querySelector(".clearTask");
// const filter = document.querySelector('#filter');
const newTask = document.querySelector("#taskInput");

// -------------------------------------------------

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTask);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task button
  clearBtn.addEventListener("click", clearTask);
  // Filter tasks event
}

// -------------------------------------------------

// Get tasks from the DOM
function getTask(e) {
  // Check local storage & put it to the variable
  // Initialize the taskList
  let taskArray;

  // Check if sth is in the LS
  if (localStorage.getItem("taskList") === null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("taskList"));
  }

  // Loop throught the tasks that're already there
  // For each task inside the DOM, we create the task in the html
  taskArray.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    li.className = "taskItem";
    // Create text node & append to the li
    li.appendChild(document.createTextNode(task));
    // Create the delete icon
    const link = document.createElement("a");
    // Add class
    link.className = "deleteItem";
    // Add icon
    link.innerHTML = '<i class="far fa-times-circle"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append the li to ul
    taskList.appendChild(li);
  });
}

// Add tasks function
function addTask(e) {
  // make sure there's actually value in the input
  if (taskInput.value === "") {
    alert("Please add a task");
  }

  // Create li element
  const li = document.createElement("li");
  li.className = "taskItem";
  // Create text node & append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create the delete icon
  const link = document.createElement("a");
  // Add class
  link.className = "deleteItem";
  // Add icon
  link.innerHTML = '<i class="far fa-times-circle"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append the li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";

  // console.log(li);

  e.preventDefault();
}

// ------------------------------------------------

// Store task
function storeTaskInLocalStorage(newTask) {
  let taskList;

  // Check if sth is in the LS
  if (localStorage.getItem("taskList") === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  //put new task to the task list array
  taskList.push(newTask);

  // reset the LS w/ the new task list array
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Remove task
function removeTask(e) {
  // Target the delete item
  if (e.target.parentElement.classList.contains("deleteItem")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// ------------------------------------------
// Remove from LS
function removeTaskFromLocalStorage(deleteItem) {
  // Check local storage & put it to the variable
  // Initialize the taskList
  let taskArray;

  // Check if sth is in the LS
  if (localStorage.getItem("taskList") === null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("taskList"));
  }

  //Loop through the array of the LS, if the textContent of the delete item equal to the task in the array, we delete it
  taskArray.forEach(function(task, index) {
    if (deleteItem.textContent === task) {
      taskArray.splice(index, 1);
    }
  });

  // set the local storage again
  localStorage.setItem("taskList", JSON.stringify(taskArray));
}

// ----------------------------------------------
// Clear task button
function clearTask(e) {
  // taskList.innerHTML = "";

  // Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear task from LS
  clearTasksFromLocalStorage();
}

// --------------------------------------------
// Clear task from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
