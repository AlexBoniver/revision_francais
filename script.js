var myList = [];
var answer = [];

fetchData('data.json')
  .then(data => {
    if (data) {
      myList = data; // Assigner les données à myList
      console.log(myList);
    } else {
      console.log('Failed to fetch data');
    }
  })
  .then(() => {
    SetQuestion(myList);
  });

// La liste sera mise à jour de manière asynchrone
console.log('Fetching data...');



// Fonction fetchData
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data; // Retourner les données pour une utilisation ultérieure
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      return null; // Retourner null en cas d'erreur
    });
}

function SetQuestion(List) {
    var questionId = (document.getElementById("idSelectorInput").value);
    document.getElementById("question").textContent = List[questionId - 1].id + ". " +  List[questionId - 1].question;
    answer = myList[questionId - 1].answer;
    document.getElementById("displayAnswerCb").checked = false;
    document.getElementById("answerTA").value = "";
    document.getElementById("notesTA").value = "";
}

function NextQuestion() {
    fetchData("data.json");
    SetQuestion(myList);
}

function IncrementQuestion() {
  if(document.getElementById("randomOrderCb").checked)
    {
      var newQuestionId = Math.floor(Math.random() * myList.length) + 1;
      while (newQuestionId == document.getElementById("idSelectorInput").value)
        {
          newQuestionId = Math.floor(Math.random() * myList.length) + 1;
        }
      document.getElementById("idSelectorInput").value = newQuestionId;
    }
  else
  {
    if(document.getElementById("idSelectorInput").value < myList.length) document.getElementById("idSelectorInput").value++;
    else document.getElementById("idSelectorInput").value = 1;
  }
    NextQuestion();
}

document.getElementById("idSelectorInput").addEventListener('input', function() {
    NextQuestion();
});

document.getElementById("displayAnswerCb").addEventListener('click', function() {
  if(document.getElementById("displayAnswerCb").checked) DisplayAnswer(answer);
  else document.getElementById("answerTA").value = "";
});

function DisplayAnswer(answer) {
  var answerTa = document.getElementById("answerTA");
  answer.forEach(element => {
    answerTa.value += "• " + element + "\n"
  });
  console.log(answer);
}