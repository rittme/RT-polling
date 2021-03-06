var socket = io();

socket.on('question update', function(question){
  currQuestion = question;
  populateSlides(question);
});

socket.on('vote update', function(question){
  questions = question;
  populateSlides(currQuestion);
});

socket.on('question blocked', function(question){
  for(var i=0; i < 4; i++) {
    if(i != question) {
      document.getElementById("q"+(i)).classList.add("hidden");
    }
  }
});

function populateSlides(curr) {
  var question = questions[curr];

  document.getElementById("question-label").innerHTML = question.question;
  for(var i=0; i < 4; i++) {
    var qDisplay = document.getElementById("q"+(i));
    if(question.options[i]) {
      console.log(qDisplay);
      qDisplay.classList.remove("hidden");
      qDisplay.firstChild.innerHTML = (i+1) + ") " + question.options[i].option + " - <div class='votes-counter'>" + question.options[i].votes + "</div>";
    } else {
      console.log(qDisplay);
      qDisplay.classList.add("hidden");
      qDisplay.firstChild.innerHTML = "";
    }
  }
}

populateSlides(currQuestion);
