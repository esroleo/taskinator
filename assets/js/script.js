//console.log(window.document);
//console.dir(window.document);

var buttonEl = window.document.querySelector("#save-task");
console.log(buttonEl);

buttonEl.addEventListener("click", function() {
    alert("button clicked");
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