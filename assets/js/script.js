//console.log(window.document);
//console.dir(window.document);



var buttonEl = window.document.querySelector("#save-task"); // query selector for #save-task id element
console.log(buttonEl);

var tasksToDoEl = document.querySelector("#tasks-to-do"); // query selector for #tasks-to-do id element



var createTaskHandler = function() { // Function to add task which is called by buttonEl onced clicked.
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  }

buttonEl.addEventListener("click", createTaskHandler); // Add Task button


  var counter = 10;
  var countdown = function() {
      console.log(counter);
      counter--;
      if(counter === 0) {
          console.log("blastoff");
          clearInterval(startCountDown);
      }
  }

var startCountDown = setInterval(countdown, 1000);


