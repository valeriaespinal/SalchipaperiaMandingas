let refs = {};
let btns = {};

window.onload = init;

function init() {
    refs["splash"] = document.getElementById("splash");
    refs["registro"] = document.getElementById("registro");
    refs["tutorial"] = document.getElementById("tutorial");
    refs["juego"] = document.getElementById("juego");
    refs["tienda"] = document.getElementById("tienda");
    refs["puntuacion"] = document.getElementById("puntuacion");
    refs["configuracion"] = document.getElementById("configuracion");
    refs["creditos"] = document.getElementById("creditos");

    btns["btn_juego"] = document.getElementById("btn_juego");
    btns["btn_registro"] = document.getElementById("btn_registro");
    btns["btn_configuracion"] = document.getElementById("btn_configuracion");
    btns["btn_tutorial"] = document.getElementById("btn_tutorial");
    btns["btn_tienda"] = document.getElementById("btn_tienda");
    btns["btn_puntuacion"] = document.getElementById("btn_puntuacion");
    btns["btn_creditos"] = document.getElementById("btn_creditos");
    setTimeout(() => {
      cargarSeccion("creditos");
    }, 3000);

    asignarEventosMenu();
}

function asignarEventosMenu() {
    btns["btn_juego"].addEventListener("click", () => cargarSeccion("juego"));
    btns["btn_registro"].addEventListener("click", () => cargarSeccion("registro"));
    btns["btn_configuracion"].addEventListener("click", () => cargarSeccion("configuracion"));
    btns["btn_tutorial"].addEventListener("click", () => cargarSeccion("tutorial"));
    btns["btn_tienda"].addEventListener("click", () => cargarSeccion("tienda"));
    btns["btn_puntuacion"].addEventListener("click", () => cargarSeccion("puntuacion"));
    btns["btn_creditos"].addEventListener("click", () => cargarSeccion("creditos"));
}

function ocultar() {
    for (let key in refs) {
        refs[key].classList.add("ocultar");
    }
}

function cambiarSeccion(e) {
  const targetId = e.currentTarget.id;  
  const seccion = targetId.split("_")[1]; 
  cargarSeccion(seccion);
}

function cargarSeccion(seccion) {
  ocultar();
  refs[seccion].classList.remove("ocultar");
  refs[seccion].classList.add("animate__animated", "animate__fadeIn");
}


let totalSalchipapas = 0;
let currentSalchipapas = 0;
let salchipapasPerSecond = 0;

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

function generateSalchipapas() {
  currentSalchipapas++;
  totalSalchipapas++;
  updateUI();
  playCrunchSound();
}

function updateUI() {
  document.getElementById("salchipapas-count").textContent = `${currentSalchipapas} salchipapas`;
  document.getElementById("salchipapas-per-second").textContent = `${salchipapasPerSecond} salchipapas por segundo`;
  document.getElementById("total-salchipapas").textContent = `${totalSalchipapas} salchipapas vendidas a lo largo de la historia`;
  updateStatusMessage();
}

function playCrunchSound() {
  const audio = document.getElementById('cruchaudio');
  audio.play();
}

setInterval(() => {
  currentSalchipapas += salchipapasPerSecond;
  totalSalchipapas += salchipapasPerSecond;
  updateUI();
}, 1000);
