// Taskinator app!
var pageContentEl = document.querySelector("#page-content"); // To hold our click event handler event bubbling
var taskIdCounter = 0; // Unique Id counter for created tasks
var tasksInProgressEl = document.querySelector("#tasks-in-progress"); // Holds the space for div of task in progress
var tasksCompletedEl = document.querySelector("#tasks-completed"); // Holds the space for div of tasks completed
var tasks = []; // array of task objects
var formEl = document.querySelector("#task-form"); // Listen to an event happending on the entire form 
//var buttonEl = window.document.querySelector("#save-task"); // query selector for #save-task id element
var tasksToDoEl = document.querySelector("#tasks-to-do"); // query selector for #tasks-to-do id element

var createTaskEl = function(taskDataObj) {

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true"); // Make the li dragable

    var taskInfoEl = document.createElement("div"); // create div to hold task info and add to list item
    taskInfoEl.className = "task-info"; // give it a class name
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // Task information // add HTML content to div
    listItemEl.appendChild(taskInfoEl);// Send the task to the parent which will inherit the styles.

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    //console.log(taskActionsEl);

    // add entire list item to list
    //tasksToDoEl.appendChild(listItemEl);
    
    switch (taskDataObj.status) {
        case "to do":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
        tasksToDoEl.append(listItemEl);
        break;
        case "in progress":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.append(listItemEl);
        break;
        case "completed":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.append(listItemEl);
        break;
        default:
        console.log("Something went wrong!");
    }


    // add id to the taskData object received by our save tasks button.
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj); // Push object at the end of array called tasks

    saveTasks(); // Calling the save tasks function to local storage

    // increase task counter for next unique id
    taskIdCounter++;

    //console.log(taskDataObj);
    //console.log(taskDataObj.status);

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
    //console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id === parseInt(taskId)) { // Tasks are the tasks on our array.
        tasks[i].name = taskName;
        tasks[i].type = taskType;
        }
    };

    saveTasks(); // Calling the save tasks function to local storage

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
    //console.log(isEdit);
    

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
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
    //console.log("editing task #" + taskId);

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

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
    }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    //console.log(tasks);

    saveTasks(); // Calling the save tasks function to local storage


};

var taskStatusChangeHandler = function(event) {
    
    //console.log(event.target);

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

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
        }
    }

    saveTasks(); // Calling the save tasks function to local storage

};

var dragTaskHandler = function(event) { // dragstart function()
    //console.log("event.target:", event.target); 
    //console.log("event.type:", event.type);
    //console.log("event", event);
    var taskId = event.target.getAttribute("data-task-id");
    //console.log("Task ID:", taskId);
    //console.log("event", event);


    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
    //console.log("getId:", getId, typeof getId);
    
  } 

var dropZoneDragHandler = function(event) { // dragover function()
    //console.log("Dragover Event Target:", event.target);
    event.preventDefault(); // Allows to be able to drop to other elements which is not the default behavior.
    //targetElement.closest(selector);
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
      event.preventDefault();
      //console.dir(taskListEl);
      taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }

    
};

var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    //console.log("Drop Event Target:", event.target, event.dataTransfer, id);
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    //console.log(draggableElement);
    //console.dir(draggableElement);
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
   // console.log(statusType);
   // console.dir(dropZoneEl);
    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    //console.dir(statusSelectEl);
    //console.log(statusSelectEl);
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
      } 
      else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
      } 
      else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
      }

      dropZoneEl.removeAttribute("style");

      dropZoneEl.appendChild(draggableElement);

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
        tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    
    saveTasks(); // Calling the save tasks function to local storage

    //console.log(tasks);

  };

var dragLeaveHandler = function(event) { // Function for the dragLeave handler
    ///console.dir(event.target);
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
    taskListEl.removeAttribute("style");
}
}

var saveTasks = function() { // save task function to local storage
    localStorage.setItem("tasks", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Local storage cant hold naturally objects hence json stringify

}

var loadTasks = function() { // save task function to local storage
    var savedTasks = localStorage.getItem("tasks");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
      return false;
    }
    console.log("Saved tasks found!");
    // else, load up saved tasks
  
    // parse into array of objects
    savedTasks = JSON.parse(savedTasks);
  
    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
      // pass each task object into the `createTaskEl()` function
      createTaskEl(savedTasks[i]);
    }
}

pageContentEl.addEventListener("click", taskButtonHandler); // Event listener for our main html content
pageContentEl.addEventListener("change", taskStatusChangeHandler); // Event listener of our main conent but will target change events rather than clicks.
pageContentEl.addEventListener("dragstart", dragTaskHandler); // Event listener for the dragstart event handler
pageContentEl.addEventListener("dragover", dropZoneDragHandler); // Event listener for the dragover event handler
pageContentEl.addEventListener("drop", dropTaskHandler); // Evenet listener for the drop event handler
pageContentEl.addEventListener("dragleave", dragLeaveHandler); // Used as drage leave to remove css styling

loadTasks(); // Load existing tasks