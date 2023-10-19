function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let isRunning = false;
let timer;

const buttonStart = document.querySelector("button[data-start]");
const buttonStop = document.querySelector("button[data-stop]");

buttonStart.addEventListener("click", () => {
  if (isRunning) {
    return;
  }

  isRunning = true;
  buttonStart.disabled = true;

  timer = setInterval(() => {
    if (isRunning) {
      const newColor = getRandomHexColor();
      document.body.style.backgroundColor = newColor;
    } else {
      clearInterval(timer);
    }
  }, 1000);
});

buttonStop.addEventListener("click", () => {
  if (!isRunning) {
    return;
  }

  isRunning = false;
  buttonStart.disabled = false;

  clearInterval(timer);
});
