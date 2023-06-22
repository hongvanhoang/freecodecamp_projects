// preloader element: show when page has not finish loading, hide when page finishes loading
const preloader = document.querySelector(".preloader");
window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

//buttons
const startBtn = document.getElementById("start_stop");
const pauseDiv = document.querySelector(".pause-btn"); // pause div of start button
const playDiv = document.querySelector(".play-btn"); // play div of start button
const sessionDecrement = document.getElementById("session-decrement");
const sessionIncrement = document.getElementById("session-increment");
const restDecrement = document.getElementById("break-decrement");
const restIncrement = document.getElementById("break-increment");
const resetBtn = document.getElementById("reset");

// declare variables
const timerLabel = document.getElementById("timer-label");
const workDurationInput = document.getElementById("session-length");
const restDurationInput = document.getElementById("break-length");
const timerTime = document.getElementById("time-left");

let workDuration = parseInt(workDurationInput.innerHTML) * 60;
let restDuration = parseInt(restDurationInput.innerHTML) * 60;
let remainingTime = workDuration;
let isSession = true;
let isRest = false;
let isPaused = true;
let intervalId;

// audio play
const workFinished = new Audio(
  "https://upload.wikimedia.org/wikipedia/commons/5/5c/Alarm_clock_-_01.ogg"
);
workFinished.setAttribute("id", "beep");
document.body.appendChild(workFinished);

//start-pause button
startBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  if (isPaused) {
    pauseDiv.classList.add("hide-element");
    playDiv.classList.remove("hide-element");
    clearInterval(intervalId);
  }
  if (!isPaused) {
    playDiv.classList.add("hide-element");
    pauseDiv.classList.remove("hide-element");
    intervalId = setInterval(updateTimer, 1000);
  }
  if (!intervalId) {
    intervalId = setInterval(updateTimer, 1000);
  }
});

function updateTimer() {
  if (!isPaused) {
    remainingTime--;
    if (isSession) {
      timerLabel.innerHTML = "Working";
    } else if (isRest) {
      timerLabel.innerHTML = "Rest";
    }
    if (remainingTime < 0) {
      isSession = !isSession;
      isRest = !isRest;
      if (isRest) {
        remainingTime = parseInt(restDurationInput.innerHTML) * 60;
      }
      if (isSession) {
        remainingTime = parseInt(workDurationInput.innerHTML) * 60;
      }
      workFinished.play();
    }
  }
  updateProgress();
  document.title = timerTime.textContent = formatTime(remainingTime);
}

function updateProgress() {
  timerTime.textContent = formatTime(remainingTime);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

// change session or break length
function changeDuration() {
  workDuration = parseInt(workDurationInput.innerHTML) * 60;
  restDuration = parseInt(restDurationInput.innerHTML) * 60;
  if (isSession) {
    remainingTime = workDuration;
    updateProgress();
  }
  if (isRest) {
    remainingTime = restDuration;
    updateProgress();
  }
}

sessionDecrement.addEventListener("click", () => {
  if (workDurationInput.innerHTML <= 1) return;
  workDurationInput.innerHTML--;
  changeDuration();
});
sessionIncrement.addEventListener("click", () => {
  if (workDurationInput.innerHTML >= 60) return;
  workDurationInput.innerHTML++;
  changeDuration();
});

restDecrement.addEventListener("click", () => {
  if (restDurationInput.innerHTML <= 1) return;
  restDurationInput.innerHTML--;
  changeDuration();
});
restIncrement.addEventListener("click", () => {
  if (restDurationInput.innerHTML >= 60) return;
  restDurationInput.innerHTML++;
  changeDuration();
});

// reset button
resetBtn.addEventListener("click", () => {
  // stop the clock
  clearInterval(intervalId)
  isRest = false;
  isSession = true;
  isPaused = true;
  pauseDiv.classList.add("hide-element");
  playDiv.classList.remove("hide-element");
  // reset settings to default
  workDurationInput.innerHTML = 25;
  restDurationInput.innerHTML = 5;
  changeDuration();
  timerTime.innerText = "25:00";
  timerLabel.innerHTML = "Session";
  // stop audio
  if (!workFinished.paused) {
    workFinished.pause();
    workFinished.currentTime = 0;
  }
});
