// Taskinator app!
var pageContentEl = document.querySelector("#page-content"); // To hold our click event handler event bubbling
var taskIdCounter = 0; // Unique Id counter for created tasks
var tasksInProgressEl = document.querySelector("#tasks-in-progress"); // Holds the space for div of task in progress
var tasksCompletedEl = document.querySelector("#tasks-completed"); // Holds the space for div of tasks completed

var formEl = document.querySelector("#task-form"); // Listen to an event happending on the entire form 
//var buttonEl = window.document.querySelector("#save-task"); // query selector for #save-task id element
var tasksToDoEl = document.querySelector("#tasks-to-do"); // query selector for #tasks-to-do id element

var createTaskEl = function(taskDataObj) {

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item
    taskInfoEl.className = "task-info"; // give it a class name
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // Task information // add HTML content to div
    listItemEl.appendChild(taskInfoEl);// Send the task to the parent which will inherit the styles.

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    //console.log(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;

}

var createTaskActions = function(taskId) { //Function to create task actions

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"]; // Options to select

    for (var i = 0; i < statusChoices.length; i++) { // loop and append options to the parent statusSelectEl select html element
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }


    return actionContainerEl;

};

// Function that will be called if an item already exist. Aks being edited.
var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id"); // Reset form after editting
    document.querySelector("#save-task").textContent = "Add Task"; // Change the button back to Add task.
};


var taskFormHandler = function(event) { // Function to add task which is called by buttonEl onced clicked.
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value; // query selector for input task name
    var taskTypeInput = document.querySelector("select[name='task-type']").value; // query selector for input task type

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      }

    // Existing task will already have an attribute set, hence the below will pring if already created.
    var isEdit = formEl.hasAttribute("data-task-id");
    console.log(isEdit);
    

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
        };

        createTaskEl(taskDataObj); // send it as an argument to createTaskEl
    }
   
    formEl.reset();
};

//buttonEl.addEventListener("click", createTaskHandler); // Add Task button
formEl.addEventListener("submit", taskFormHandler); // Listen to submit on the form.

var taskButtonHandler = function(event) { // funciton for our event listener
    //console.log(event.target); //funciton of event that allows you to see the element selected
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }

  };

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //console.log(taskType);

    // Change the button save task
    document.querySelector("#save-task").textContent = "Save Task";

    // Change the forms current attribute to task id.
    formEl.setAttribute("data-task-id", taskId);


};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var taskStatusChangeHandler = function(event) {
    
    console.log(event.target);

    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }

};

pageContentEl.addEventListener("click", taskButtonHandler); // Event listener for our main html content
pageContentEl.addEventListener("change", taskStatusChangeHandler); // Event listener of our main conent but will target change events rather than clicks.

