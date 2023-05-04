// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver


function showHideShots() {
    let check = document.getElementById('opponent');
    let rpsGame = document.getElementById('rps').checked;

    if (check.checked == true && rpsGame == true) {
        $('.shots').show();
        $('.rpsls').hide(); // Hide Lizard and Spock when playing RPS against an opponent
    } else if (check.checked == true && rpsGame == false) {
        $('.shots').show();
    } else {
        $('.shots').hide();
    }
}

function startOver() {
    document.getElementById('userinput').reset();
    showHideShots();
    
    // Clear the results
    document.getElementById('results').innerHTML = '';
  }

  function resetShotSelection() {
    let game = $('input[type=radio][name=game]:checked').val();
    let randomShot = getRandomShot(game);
  
    // Reset the selected shot to a random valid option for the chosen game
    $('input[type=radio][name=shot]').prop('checked', false);
    $(`input[type=radio][name=shot][value=${randomShot}]`).prop('checked', true);
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
  
  
  