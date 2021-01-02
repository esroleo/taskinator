// Taskinator app!

var formEl = document.querySelector("#task-form"); // Listen to an event happending on the entire form 
//var buttonEl = window.document.querySelector("#save-task"); // query selector for #save-task id element
var tasksToDoEl = document.querySelector("#tasks-to-do"); // query selector for #tasks-to-do id element

var createTaskEl = function(taskDataObj) {


    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item

    taskInfoEl.className = "task-info"; // give it a class name

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // Task information // add HTML content to div

    listItemEl.appendChild(taskInfoEl);// Send the task to the parent which will inherit the styles.

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);


}

var taskFormHandler = function(event) { // Function to add task which is called by buttonEl onced clicked.
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value; // query selector for input task name
    var taskTypeInput = document.querySelector("select[name='task-type']").value; // query selector for input task type

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      }

    // package up data as an object
    var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    formEl.reset();
};

//buttonEl.addEventListener("click", createTaskHandler); // Add Task button
formEl.addEventListener("submit", taskFormHandler); // Listen to submit on the form.

