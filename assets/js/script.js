// Taskinator app!

var formEl = document.querySelector("#task-form"); // Listen to an event happending on the entire form 
var buttonEl = window.document.querySelector("#save-task"); // query selector for #save-task id element
var tasksToDoEl = document.querySelector("#tasks-to-do"); // query selector for #tasks-to-do id element

var createTaskHandler = function(event) { // Function to add task which is called by buttonEl onced clicked.
    event.preventDefault();
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  };

//buttonEl.addEventListener("click", createTaskHandler); // Add Task button
formEl.addEventListener("submit", createTaskHandler); // Listen to submit on the form.

