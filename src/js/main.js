function goToView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
  }

let totalSalchipapas = 0;
let currentSalchipapas = 0;
let salchipapasPerSecond = 0;

// Función para actualizar el mensaje de estado
function updateStatusMessage() {
  const statusMessage = document.getElementById("status-message");
  if (totalSalchipapas === 0) statusMessage.textContent = "Aún nadie quiere probar tus salchipapas";
  else if (totalSalchipapas <= 100) statusMessage.textContent = "A la gente le parece que tus salchipapas están ok";
  else if (totalSalchipapas <= 1000) statusMessage.textContent = "Tus salchipapas están empezando a tener renombre";
  else if (totalSalchipapas <= 10000) statusMessage.textContent = "Numerosos reels promocionan tus salchipapas";
  else if (totalSalchipapas <= 100000) statusMessage.textContent = "Tus salchipapas son un éxito en todo el país";
  else if (totalSalchipapas <= 1000000) statusMessage.textContent = "Tus salchipapas están empezando a dominar el mundo";
  else if (totalSalchipapas <= 10000000) statusMessage.textContent = "Religiones se crean para alabar tus salchipapas";
  else statusMessage.textContent = "Tus salchipapas tienen más poder que los líderes mundiales";
}

// Función para generar salchipapas
function generateSalchipapas() {
  currentSalchipapas++;
  totalSalchipapas++;
  updateUI();
  playCrunchSound();
}

// Función para actualizar el UI
function updateUI() {
  document.getElementById("salchipapas-count").textContent = `${currentSalchipapas} salchipapas`;
  document.getElementById("salchipapas-per-second").textContent = `${salchipapasPerSecond} salchipapas por segundo`;
  document.getElementById("total-salchipapas").textContent = `${totalSalchipapas} salchipapas vendidas a lo largo de la historia`;
  updateStatusMessage();
}

// Función para el sonido de crujido
function playCrunchSound() {
  const crunchSound = new Audio("sounds/crunch-sound.mp3");
  crunchSound.play();
}

// Incrementar salchipapas automáticamente por segundo
setInterval(() => {
  currentSalchipapas += salchipapasPerSecond;
  totalSalchipapas += salchipapasPerSecond;
  updateUI();
}, 1000);
