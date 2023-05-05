// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver


function showHideShots() {
  let check = document.getElementById("opponent");
  let rpsGame = document.getElementById("rps").checked;

  if (check.checked) {
    if (rpsGame) {
      $(".input-container.rps").show();
      $(".input-container.rpsls").hide(); // Hide Lizard and Spock when playing RPS against an opponent
      $("label[class='input-container' for='rock'], label[class='input-container' for='paper'], label[class='input-container' for='scissors']").show(); // Show Rock, Paper, and Scissors labels
      $("label[class='input-container' for='lizard'], label[class='input-container' for='spock']").hide();
    } else {
      $(".input-container.rps, .input-container.rpsls").show();
      $("label[class='input-container' for='rock'], label[class='input-container' for='paper'], label[class='input-container' for='scissors'], label[class='input-container' for='lizard'], label[class='input-container' for='spock']").show(); // Hide the labels      // Show all labels
    }
  } else {
    $(".input-container.rps, .input-container.rpsls").hide();

    $("label[class='input-container' for='rock'], label[class='input-container' for='paper'], label[class='input-container' for='scissors'], label[class='input-container' for='lizard'], label[class='input-container' for='spock']").hide(); // Hide the labels
  }

  // Hide the radio inputs and show only the input-container elements
  $("input[type='radio'][name='shot']").hide();
  $(".input-container").removeClass("selected");
  $(".input-container").css("display", "inline-flex");
}

function startOver() {
  document.getElementById('userinput').reset();
  document.getElementById('results').innerHTML = '';
  showHideShots();
}

function resetShotSelection() {
  let firstShot = 'rock'

  // Reset the selected shot to a random valid option for the chosen game
  $('input[type=radio][name=shot]').prop('checked', false);
  $(`input[type=radio][name=shot][value=${firstShot}]`).prop('checked', true);
}

function getRandomShot(game) {
  const availableShots = {
    rps: ['rock', 'paper', 'scissors'],
    rpsls: ['rock', 'paper', 'scissors', 'lizard', 'spock']
  };

  const shots = availableShots[game];
  return shots[Math.floor(Math.random() * shots.length)];
}

async function playGame() {
  let game = $('input[type=radio][name=game]:checked').val();
  let shot = $('input[type=radio][name=shot]:checked').val();

  // Check if the user has not selected an opponent
  let opponentCheckbox = document.getElementById('opponent');
  if (!opponentCheckbox.checked) {
    shot = getRandomShot(game); // Set the user's shot to a random shot
  }

  let baseurl = window.location.href + 'app/';
  console.log(baseurl);
  let url = baseurl + game + '/play/' + shot;
  console.log(url);

  let response = await fetch(url);
  let result = await response.json();
  console.log(result);

  // Display the results on the page
  let resultsDiv = document.getElementById('results');
  if (result.error) {
    resultsDiv.innerHTML = result.error;
  } else {
    let you = `You: ${result.player}`;
    let opponent = `Opponent: ${result.opponent}`;
    let outcome = `Result: You ${result.result.toUpperCase()}!`;
    resultsDiv.innerHTML = `${you}<br>${opponent}<br>${outcome}`;
  }
}















