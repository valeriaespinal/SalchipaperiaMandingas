let refs = [];
let btns = [];

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
    btns["btn_volver"] = document.getElementById("btn_volver");
    btns["btn_continuar"] = document.getElementById("btn_continuar");
    
    setTimeout(() => {
      cargarSeccion("registro");
    }, 3000);

    asignarEventosMenu();
}

function asignarEventosMenu() {
    btns["btn_juego"].addEventListener("click", () => cargarSeccion("juego"));
    btns["btn_volver"].addEventListener("click", () => cargarSeccion("juego"));
    btns["btn_continuar"].addEventListener("click", () => cargarSeccion("juego"));
    // btns["btn_configuracion"].addEventListener("click", () => cargarSeccion("configuracion"));
    // btns["btn_tutorial"].addEventListener("click", () => cargarSeccion("tutorial"));
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

//cantidad de mejoras
let cant_granja_de_papas = 0;
let cant_fabrica_de_salchichas = 0;
let cant_criadero_de_codornices = 0;
let cant_casa_de_cerdos = 0;
let cant_lecheria = 0;
let cant_cultivo_de_maiz_genetico = 0;
let cant_fabrica_de_emulsion_de_scott = 0;
let cant_maquinas_de_helados_de_chicle = 0;
let cant_plantacion_de_tomates = 0;
let cant_planta_nuclear_de_ranio_235u = 0;
let cant_fabrica_de_tarro_carmesi = 0;
let cant_laboratorio_de_natilla = 0;
let cant_fabrica_de_tejidos_extraños = 0;
let cant_mirella_dimensional = 0;

//costo de mejoras
let cst_granja_de_papas = 10;
let cst_fabrica_de_salchichas = 76;
let cst_criadero_de_codornices = 152;
let cst_casa_de_cerdos = 228;
let cst_lecheria = 304;
let cst_cultivo_de_maiz_genetico = 380;
let cst_fabrica_de_emulsion_de_scott = 456;
let cst_maquinas_de_helados_de_chicle = 532;
let cst_plantacion_de_tomates = 608;
let cst_planta_nuclear_de_ranio_235u = 684;
let cst_fabrica_de_tarro_carmesi = 760;
let cst_laboratorio_de_natilla = 836;
let cst_fabrica_de_tejidos_extraños = 912;
let cst_mirella_dimensional = 1000;

//producción de mejoras
let prod_granja_de_papas = 0.5;
let prod_fabrica_de_salchichas = 1;
let prod_criadero_de_codornices = 1.5;
let prod_casa_de_cerdos = 2;
let prod_lecheria = 2.5;
let prod_cultivo_de_maiz_genetico = 3;
let prod_fabrica_de_emulsion_de_scott = 3.5;
let prod_maquinas_de_helados_de_chicle = 4;
let prod_plantacion_de_tomates = 4.5;
let prod_planta_nuclear_de_ranio_235u = 5;
let prod_fabrica_de_tarro_carmesi = 5.5;
let prod_laboratorio_de_natilla = 6;
let prod_fabrica_de_tejidos_extraños = 6.5;
let prod_mirella_dimensional = 7;

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
