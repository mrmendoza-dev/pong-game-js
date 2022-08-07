import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("playerPaddle"));
const computerPaddle = new Paddle(document.getElementById("computerPaddle"));
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const display = document.getElementById("display");

const displayWidth = display.getBoundingClientRect().width;
const displayHeight = display.getBoundingClientRect().height;


let playerScore = 0;
let computerScore = 0;






let lastTime;
function update(time) {

  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= displayWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= displayWidth) {
    playerScore += 1;
    playerScoreEl.textContent = playerScore;
  } else {
    computerScore += 1;
    computerScoreEl.textContent = computerScore;
  }
  ball.reset();
  computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / displayHeight) * 100;
});

window.requestAnimationFrame(update);



export { displayHeight };







// game only works while in top left corner
// dont let paddle move beyond boundary