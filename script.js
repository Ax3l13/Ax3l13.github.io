const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 100,
  size: 30,
  value: 10
};

const portals = [];
const operations = ["+", "-", "x", ":"];

function randomPortal() {
  const op = operations[Math.floor(Math.random() * operations.length)];
  const val = Math.floor(Math.random() * 9) + 2;
  return {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 50,
    height: 50,
    op: op,
    val: val,
    hit: false
  };
}

function applyOperation(player, portal) {
  switch (portal.op) {
    case "+": player.value += portal.val; break;
    case "-": player.value -= portal.val; break;
    case "x": player.value *= portal.val; break;
    case ":": player.value = Math.floor(player.value / portal.val); break;
  }
  document.getElementById("valeur").innerText = player.value;
}

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawPortal(p) {
  ctx.fillStyle = {
    "+": "green",
    "-": "red",
    "x": "blue",
    ":": "orange"
  }[p.op] || "white";
  ctx.fillRect(p.x, p.y, p.width, p.height);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`${p.op}${p.val}`, p.x + 5, p.y + 30);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  // Génère de nouveaux portails aléatoirement
  if (Math.random() < 0.02) {
    portals.push(randomPortal());
  }

  // Met à jour et dessine les portails
  for (let p of portals) {
    p.y += 2;
    drawPortal(p);

    if (!p.hit &&
        p.y + p.height > player.y &&
        p.y < player.y + player.size &&
        p.x + p.width > player.x &&
        p.x < player.x + player.size) {
      applyOperation(player, p);
      p.hit = true;
    }
  }

  // Nettoyer les portails hors écran
  for (let i = portals.length - 1; i >= 0; i--) {
    if (portals[i].y > canvas.height) portals.splice(i, 1);
  }

  requestAnimationFrame(update);
}

update();

