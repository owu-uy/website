const days = document.getElementById("days");
const hours = document.getElementById("hours");
const mins = document.getElementById("mins");
const seconds = document.getElementById("seconds");

const newYears = "Oct 20, 2023 9:00 AM";

coutDown();

function coutDown(e) {
  const newYearsDate = new Date(newYears);
  const currentDay = new Date();

  const totalSec = (newYearsDate - currentDay) / 1000;

  const sec = Math.floor(totalSec) % 60;
  const min = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600) % 24;
  const d = Math.floor(totalSec / 3600 / 24);
  days.innerHTML = `<h1>${d}</h1><h2>days</h2>`;
  hours.innerHTML = `<h1>${h}</h1><h2>hours</h2>`;
  mins.innerHTML = `<h1>${min}</h1><h2>mins</h2>`;
  seconds.innerHTML = `<h1>${sec}</h1><h2>seconds</h2>`;
}

setInterval(coutDown, 1000);
