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

function findGate() {
  const bestGate = findBestOption(venueData.gates, "crowd");
  document.getElementById("result").innerText =
    `${bestGate.name} is the best entry option based on lower crowd and easier access.`;
}

function findFood() {
  const bestFood = findBestOption(venueData.foodStalls, "wait");
  document.getElementById("result").innerText =
    `${bestFood.name} is the best food option based on shorter wait time and distance.`;
}

function findWashroom() {
  const bestWashroom = findBestOption(venueData.washrooms, "wait");
  document.getElementById("result").innerText =
    `${bestWashroom.name} is the most convenient washroom right now.`;
}

function findExit() {
  const bestExit = findBestOption(venueData.exits, "crowd");
  document.getElementById("result").innerText =
    `${bestExit.name} is the best exit based on lower crowd and smoother movement.`;
}