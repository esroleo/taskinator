//console.log(window.document);
//console.dir(window.document);



var buttonEl = window.document.querySelector("#save-task");
console.log(buttonEl);

var tasksToDoEl = document.querySelector("#tasks-to-do");




buttonEl.addEventListener("click", function() {

    var taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "hello";
    tasksToDoEl.appendChild(taskItemEl);
});


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
