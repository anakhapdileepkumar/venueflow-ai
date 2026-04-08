const venueData = {
  gates: [
    { name: "Gate A", crowd: 90, zone: 1 },
    { name: "Gate B", crowd: 40, zone: 2 },
    { name: "Gate C", crowd: 60, zone: 4 }
  ],
  foodStalls: [
    { name: "Food Stall 1", wait: 15, zone: 1 },
    { name: "Food Stall 2", wait: 5, zone: 2 },
    { name: "Food Stall 3", wait: 8, zone: 4 }
  ],
  washrooms: [
    { name: "Washroom 1", wait: 3, zone: 1 },
    { name: "Washroom 2", wait: 1, zone: 3 },
    { name: "Washroom 3", wait: 2, zone: 4 }
  ],
  exits: [
    { name: "Exit A", crowd: 80, zone: 1 },
    { name: "Exit B", crowd: 30, zone: 3 },
    { name: "Exit C", crowd: 50, zone: 4 }
  ]
};

function loadVenueStatus() {
  const gatesContainer = document.getElementById("gates-container");
  const foodContainer = document.getElementById("food-container");
  const washroomContainer = document.getElementById("washroom-container");

  gatesContainer.innerHTML = "";
  foodContainer.innerHTML = "";
  washroomContainer.innerHTML = "";

  venueData.gates.forEach(gate => {
    const div = document.createElement("div");
    div.className = getCrowdClass(gate.crowd);
    div.innerHTML = `
      <h3>${gate.name}</h3>
      <p>Crowd: ${gate.crowd}</p>
      <p>Zone: ${gate.zone}</p>
    `;
    gatesContainer.appendChild(div);
  });

  venueData.foodStalls.forEach(stall => {
    const div = document.createElement("div");
    div.className = getWaitClass(stall.wait);
    div.innerHTML = `
      <h3>${stall.name}</h3>
      <p>Wait: ${stall.wait} min</p>
      <p>Zone: ${stall.zone}</p>
    `;
    foodContainer.appendChild(div);
  });

  venueData.washrooms.forEach(washroom => {
    const div = document.createElement("div");
    div.className = getWaitClass(washroom.wait);
    div.innerHTML = `
      <h3>${washroom.name}</h3>
      <p>Wait: ${washroom.wait} min</p>
      <p>Zone: ${washroom.zone}</p>
    `;
    washroomContainer.appendChild(div);
  });
}

function getCrowdClass(crowd) {
  if (crowd > 70) return "status-box crowded";
  if (crowd > 40) return "status-box medium";
  return "status-box low";
}

function getWaitClass(wait) {
  if (wait > 10) return "status-box crowded";
  if (wait > 5) return "status-box medium";
  return "status-box low";
}

function getUserZone() {
  return Number(document.getElementById("user-location").value);
}

function calculateScore(option, mode, userZone) {
  const zoneDifference = Math.abs(option.zone - userZone);

  if (mode === "crowd") {
    return option.crowd + zoneDifference * 10;
  }

  return option.wait + zoneDifference * 2;
}

function findBestOption(options, mode) {
  const userZone = getUserZone();
  let best = options[0];
  let bestScore = calculateScore(best, mode, userZone);

  for (let i = 1; i < options.length; i++) {
    const current = options[i];
    const currentScore = calculateScore(current, mode, userZone);

    if (currentScore < bestScore) {
      best = current;
      bestScore = currentScore;
    }
  }

  return best;
}

function findGate() {
  const best = findBestOption(venueData.gates, "crowd");
  const userZone = getUserZone();

  document.getElementById("result").innerText =
    `Recommended: ${best.name}\nReason: It has a better balance of lower crowd and proximity from Zone ${userZone}.`;
}

function findFood() {
  const best = findBestOption(venueData.foodStalls, "wait");
  const userZone = getUserZone();

  document.getElementById("result").innerText =
    `Recommended: ${best.name}\nReason: It offers a shorter waiting time and is convenient from Zone ${userZone}.`;
}

function findWashroom() {
  const best = findBestOption(venueData.washrooms, "wait");
  const userZone = getUserZone();

  document.getElementById("result").innerText =
    `Recommended: ${best.name}\nReason: It is the most convenient washroom based on wait time and distance from Zone ${userZone}.`;
}

function findExit() {
  const best = findBestOption(venueData.exits, "crowd");
  const userZone = getUserZone();

  document.getElementById("result").innerText =
    `Recommended: ${best.name}\nReason: It provides smoother exit movement with less congestion from Zone ${userZone}.`;
}

window.onload = loadVenueStatus;