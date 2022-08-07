import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("playerPaddle"));
const computerPaddle = new Paddle(document.getElementById("computerPaddle"));
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

const display = document.getElementById("display");
let boundary = display.getBoundingClientRect();

let playerScore = 0;
let computerScore = 0;



function refreshBoundary() {
  boundary = display.getBoundingClientRect();
}


let lastTime;
function update(time) {
  refreshBoundary();
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
  return rect.right >= boundary.right || rect.left <= boundary.left;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= boundary.width) {
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
  if (e.y <= boundary.bottom && e.y >= boundary.top) {
    playerPaddle.position = ((e.y - boundary.top) / boundary.height) * 100;
  }
});

window.requestAnimationFrame(update);

export { boundary };



// add start button
// add score limit