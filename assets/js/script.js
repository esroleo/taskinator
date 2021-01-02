// Taskinator app!

var formEl = document.querySelector("#task-form"); // Listen to an event happending on the entire form 
//var buttonEl = window.document.querySelector("#save-task"); // query selector for #save-task id element
var tasksToDoEl = document.querySelector("#tasks-to-do"); // query selector for #tasks-to-do id element


var createTaskHandler = function(event) { // Function to add task which is called by buttonEl onced clicked.
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value; // query selector for input task name
    var taskTypeInput = document.querySelector("select[name='task-type']").value; // query selector for input task type
    
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    // give it a class name
    taskInfoEl.className = "task-info";

    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>"; // Task information
    listItemEl.appendChild(taskInfoEl);// Send the task to the parent which will inherit the styles.

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
  };

//buttonEl.addEventListener("click", createTaskHandler); // Add Task button
formEl.addEventListener("submit", createTaskHandler); // Listen to submit on the form.

