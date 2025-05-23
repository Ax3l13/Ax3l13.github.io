let valeur = 10;
const player = document.getElementById("player");
const valeurSpan = document.getElementById("valeur");
const portals = document.querySelectorAll(".portal");

let posX = 10;

function update() {
  posX += 2;
  player.style.left = posX + "px";

  portals.forEach(portal => {
    const portalX = portal.offsetLeft;
    const playerX = posX;

    // Collision simple
    if (playerX + 30 > portalX && playerX < portalX + 50 && portal.dataset.hit !== "true") {
      const type = portal.dataset.type;
      const value = parseInt(portal.dataset.value);

      if (type === "add") valeur += value;
      if (type === "sub") valeur -= value;
      if (type === "mul") valeur *= value;

      valeurSpan.innerText = valeur;
      portal.dataset.hit = "true"; // pour éviter plusieurs collisions
      portal.style.opacity = "0.3";
    }
  });

  // Arrêt à la fin du jeu
  if (posX < 600) {
    requestAnimationFrame(update);
  }
}

update();
