const availableShots = {
  rps: ['rock', 'paper', 'scissors'],
  rpsls: ['rock', 'paper', 'scissors', 'lizard', 'spock']
};

function getOpponentShot(availableShots) {
  return availableShots[Math.floor(Math.random() * availableShots.length)];
}

function rps(shot) {
  const available = availableShots.rps;
  if (!shot) {
    return { player: available[0] };
  }
  shot = shot.toLowerCase();
  if (!available.includes(shot)) {
    return {
      error: `${shot} is not a valid shot. Please choose one of: rock, paper, scissors. Rules for Rock Paper Scissors: Scissors CUTS Paper, Paper COVERS Rock, Rock CRUSHES Scissors`
    };
  }
  const opponent = getOpponentShot(available);
  if (shot === opponent) {
    return { player: shot, opponent: opponent, result: 'tie' };
  } else if ((shot === 'rock' && opponent === 'scissors') ||
             (shot === 'paper' && opponent === 'rock') ||
             (shot === 'scissors' && opponent === 'paper')) {
    return { player: shot, opponent: opponent, result: 'win' };
  } else {
    return { player: shot, opponent: opponent, result: 'lose' };
  }
}

function rpsls(shot) {
  const available = availableShots.rpsls;
  if (!shot) {
    return { player: available[0] };
  }
  shot = shot.toLowerCase();
  if (!available.includes(shot)) { 
    return {
      error: `${shot} is not a valid shot. Please choose one of: rock, paper, scissors, lizard, spock. Rules for the Lizard-Spock Expansion of Rock Paper Scissors: Scissors CUTS Paper, Paper COVERS Rock, Rock SMOOSHES Lizard, Lizard POISONS Spock, Spock SMASHES Scissors, Scissors DECAPITATES Lizard, Lizard EATS Paper, Paper DISPROVES Spock, Spock VAPORIZES Rock, Rock CRUSHES Scissors`
    };
  }
  const opponent = getOpponentShot(available);
  if (shot === opponent) {
    return { player: shot, opponent: opponent, result: 'tie' };
  } else if ((shot === 'rock' && (opponent === 'scissors' || opponent === 'lizard')) ||
             (shot === 'paper' && (opponent === 'rock' || opponent === 'spock')) ||
             (shot === 'scissors' && (opponent === 'paper' || opponent === 'lizard')) ||
             (shot === 'lizard' && (opponent === 'paper' || opponent === 'spock')) ||
             (shot === 'spock' && (opponent === 'rock' || opponent === 'scissors'))) {
    return { player: shot, opponent: opponent, result: 'win' };
  } else {
    return { player: shot, opponent: opponent, result: 'lose' };
  }
}

export { rps, rpsls };
