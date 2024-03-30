const score_0 = document.getElementById("score-0");
const score_1 = document.getElementById("score-1");
const currentScore0 = document.getElementById("current-score-0");
const currentScore1 = document.getElementById("current-score-1");
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

const newGameBtn = document.getElementById("new-game-btn");
const holdBtn = document.getElementById("hold-btn");
const rollDiceBtn = document.getElementById("roll-dice-btn");

let dice = document.querySelector(".dice");
let playing, scores, activeplayer, currentScore;

const init = () => {
  playing = true;
  scores = [0, 0];
  activeplayer = 0;
  currentScore = 0;
  score_0.textContent = 0;
  score_1.textContent = 0;
  dice.classList.add("hidden");

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.remove("winner");
  player1.classList.remove("winner");
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current-score-${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

rollDiceBtn.addEventListener("click", function () {
  if (playing) {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove("hidden");

    dice.src = `images/dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current-score-${activeplayer}`).textContent =
        currentScore;
      // currentScore1.textContent = currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activeplayer] += currentScore;

    document.getElementById(`score-${activeplayer}`).textContent =
      scores[activeplayer];

    if (scores[activeplayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");

      const winnerElement = document.querySelector(`.player-${activeplayer}`);
      winnerElement.classList.add("winner");
      //   winnerElement.style.color = "white"; // Change text color to white
      winnerElement.classList.remove("player-active");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", init);
