// Venue Data
const venueData = {
  gates: [
    { name: "Gate A", crowd: 90, distance: 2 },
    { name: "Gate B", crowd: 40, distance: 4 },
    { name: "Gate C", crowd: 60, distance: 3 }
  ],
  foodStalls: [
    { name: "Food Stall 1", wait: 15, distance: 2 },
    { name: "Food Stall 2", wait: 5, distance: 4 },
    { name: "Food Stall 3", wait: 8, distance: 3 }
  ],
  washrooms: [
    { name: "Washroom 1", wait: 3, distance: 2 },
    { name: "Washroom 2", wait: 1, distance: 5 },
    { name: "Washroom 3", wait: 2, distance: 3 }
  ],
  exits: [
    { name: "Exit A", crowd: 80, distance: 2 },
    { name: "Exit B", crowd: 30, distance: 4 },
    { name: "Exit C", crowd: 50, distance: 3 }
  ]
};

// ---------------- UI LOADING ----------------

function loadVenueStatus() {
  const container = document.getElementById("status-container");
  container.innerHTML = "";

  // Gates
  venueData.gates.forEach(gate => {
    const div = document.createElement("div");
    div.className = getCrowdClass(gate.crowd);
    div.innerHTML = `
      <h3>${gate.name}</h3>
      <p>Crowd: ${gate.crowd}</p>
    `;
    container.appendChild(div);
  });

  // Food Stalls
  venueData.foodStalls.forEach(stall => {
    const div = document.createElement("div");
    div.className = "status-box low";
    div.innerHTML = `
      <h3>${stall.name}</h3>
      <p>Wait: ${stall.wait} min</p>
    `;
    container.appendChild(div);
  });

  // Washrooms
  venueData.washrooms.forEach(w => {
    const div = document.createElement("div");
    div.className = "status-box low";
    div.innerHTML = `
      <h3>${w.name}</h3>
      <p>Wait: ${w.wait} min</p>
    `;
    container.appendChild(div);
  });
}

// Color logic for crowd
function getCrowdClass(crowd) {
  if (crowd > 70) return "status-box crowded";
  if (crowd > 40) return "status-box medium";
  return "status-box low";
}

// Load UI when page opens
window.onload = loadVenueStatus;

// ---------------- DECISION LOGIC ----------------

function findBestOption(options, mode) {
  let best = options[0];

  for (let i = 1; i < options.length; i++) {
    const current = options[i];

    let currentScore;
    let bestScore;

    if (mode === "crowd") {
      currentScore = current.crowd + current.distance;
      bestScore = best.crowd + best.distance;
    } else {
      currentScore = current.wait + current.distance;
      bestScore = best.wait + best.distance;
    }

    if (currentScore < bestScore) {
      best = current;
    }
  }

  return best;
}

// ---------------- BUTTON FUNCTIONS ----------------

function findGate() {
  const best = findBestOption(venueData.gates, "crowd");
  document.getElementById("result").innerText =
    `${best.name} is the best entry option (low crowd + good access).`;
}

function findFood() {
  const best = findBestOption(venueData.foodStalls, "wait");
  document.getElementById("result").innerText =
    `${best.name} is the fastest food option right now.`;
}

function findWashroom() {
  const best = findBestOption(venueData.washrooms, "wait");
  document.getElementById("result").innerText =
    `${best.name} is the most convenient washroom.`;
}

function findExit() {
  const best = findBestOption(venueData.exits, "crowd");
  document.getElementById("result").innerText =
    `${best.name} is the best exit with smooth movement.`;
}