import { db } from './firebase.js';
import { doc, addDoc, collection, getDoc, setDoc, updateDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

let refs = [];
let btns = [];
let nombre_salch = localStorage.getItem("nombre_salch") || '';
let totalSalchipapas = parseInt(localStorage.getItem("totalSalchipapas")) || 0;
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
let cant_planta_nuclear_de_uranio_235u = 0;
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
let cst_planta_nuclear_de_uranio_235u = 684;
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
let prod_planta_nuclear_de_uranio_235u = 5;
let prod_fabrica_de_tarro_carmesi = 5.5;
let prod_laboratorio_de_natilla = 6;
let prod_fabrica_de_tejidos_extraños = 6.5;
let prod_mirella_dimensional = 7;

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
    btns["btn_volver2"] = document.getElementById("btn_volver2");
    btns["btn_volver3"] = document.getElementById("btn_volver3");
    btns["btn_continuar"] = document.getElementById("btn_continuar");

    //botones de las mejoras
    btns["granjaPapasBtn"] = document.getElementById("granjaPapasBtn");
    btns["fabricaSalchichasBtn"] = document.getElementById("fabricaSalchichasBtn");
    btns["criaderoCodornicesBtn"] = document.getElementById("criaderoCodornicesBtn");
    btns["casaCerdosBtn"] = document.getElementById("casaCerdosBtn");
    btns["lecheriaBtn"] = document.getElementById("lecheriaBtn");
    btns["cultivoMaizBtn"] = document.getElementById("cultivoMaizBtn");
    btns["fabricaEmulsionBtn"] = document.getElementById("fabricaEmulsionBtn");
    btns["maquinaHeladosBtn"] = document.getElementById("maquinaHeladosBtn");
    btns["plantacionTomatesBtn"] = document.getElementById("plantacionTomatesBtn");
    btns["plantaNuclearBtn"] = document.getElementById("plantaNuclearBtn");
    btns["fabricaTarroBtn"] = document.getElementById("fabricaTarroBtn");
    btns["laboratorioNatillaBtn"] = document.getElementById("laboratorioNatillaBtn");
    btns["fabricaTejidosBtn"] = document.getElementById("fabricaTejidosBtn");
    btns["mirellaBtn"] = document.getElementById("mirellaBtn");
    
    setTimeout(() => {
      if (nombre_salch) {
        cargarSeccion("juego");
      } else {
        cargarSeccion("registro");
      }
    }, 2000);

    asignarEventosMenu();
    verificarDesbloqueos()
}

function asignarEventosMenu() {
    //eventos de navegación
    //btns["btn_juego"].addEventListener("click", () => cargarSeccion("juego"));
    btns["btn_volver"].addEventListener("click", () => cargarSeccion("juego"));
    btns["btn_volver2"].addEventListener("click", () => cargarSeccion("juego"));
    btns["btn_volver3"].addEventListener("click", () => cargarSeccion("juego"));
    btns["btn_continuar"].addEventListener("click", validarNombre);
    // btns["btn_configuracion"].addEventListener("click", () => cargarSeccion("configuracion"));
    // btns["btn_tutorial"].addEventListener("click", () => cargarSeccion("tutorial"));
    btns["btn_tienda"].addEventListener("click", () => cargarSeccion("tienda"));
    btns["btn_puntuacion"].addEventListener("click", () => cargarSeccion("puntuacion"));
    btns["btn_creditos"].addEventListener("click", () => cargarSeccion("creditos"));

    //eventos de mejoras
    btns["granjaPapasBtn"].addEventListener("click", () => comprarGranjaPapas());
    btns["fabricaSalchichasBtn"].addEventListener("click", () => comprarFabricaSalchichas());
    btns["criaderoCodornicesBtn"].addEventListener("click", () => comprarCriaderoCodornices());
    btns["casaCerdosBtn"].addEventListener("click", () => comprarCasaCerdos());
    btns["lecheriaBtn"].addEventListener("click", () => comprarLecheria());
    btns["cultivoMaizBtn"].addEventListener("click", () => comprarCultivoMaiz());
    btns["fabricaEmulsionBtn"].addEventListener("click", () => comprarFabricaEmulsion());
    btns["maquinaHeladosBtn"].addEventListener("click", () => comprarMaquinaHelados());
    btns["plantacionTomatesBtn"].addEventListener("click", () => comprarPlantacionTomates());
    btns["plantaNuclearBtn"].addEventListener("click", () => comprarPlantaNuclear());
    btns["fabricaTarroBtn"].addEventListener("click", () => comprarFabricaTarro());
    btns["laboratorioNatillaBtn"].addEventListener("click", () => comprarLaboratorioNatilla());
    btns["fabricaTejidosBtn"].addEventListener("click", () => comprarFabricaTejidos());
    btns["mirellaBtn"].addEventListener("click", () => comprarMirella());
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

  if (seccion == "puntuacion"){
    getTopSalchipaperias();
  }
}


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

window.generateSalchipapas = function() {
  currentSalchipapas++;
  totalSalchipapas++;
  updateUI();
  playCrunchSound();
  saveGameData();
  verificarDesbloqueos();

  saveSalchipaperiaData(nombre_salch, totalSalchipapas);
}

function updateUI() {
  document.getElementById("salchipapas-count").textContent = `${currentSalchipapas} salchipapas`;
  document.getElementById("salchipapas-per-second").textContent = `${salchipapasPerSecond} salchipapas por segundo`;
  document.getElementById("total-salchipapas").textContent = `${totalSalchipapas} salchipapas vendidas a lo largo de la historia`;
  updateStatusMessage();
  verificarDesbloqueos();
}

function playCrunchSound() {
  const audio = document.getElementById('cruchaudio');
  audio.play();
}

setInterval(() => {
  currentSalchipapas += salchipapasPerSecond;
  totalSalchipapas += salchipapasPerSecond;
  updateUI();
  verificarDesbloqueos()
}, 1000);

function validarNombre(){
  const nombreInput = document.getElementById('nombre_salchipaperia').value;
  if (nombreInput) {
    nombre_salch = nombreInput;
    localStorage.setItem("nombre_salch", nombre_salch);
    cargarSeccion("juego");
  } else {
    window.alert("Ingresa un nombre válido");
  }
}

function saveGameData() {
  localStorage.setItem("totalSalchipapas", totalSalchipapas.toString());
}

async function saveSalchipaperiaData(nombre, cantidadTotal) {
  // Verificar si el nombre está vacío
  if (!nombre.trim()) {
    console.error("El nombre no puede estar vacío.");
    alert("Por favor, ingresa un nombre válido para la salchipapería.");
    return;
  }

  const salchipaperiaRef = doc(db, "salchipaperias", nombre);

  try {
    // Intentamos obtener el documento para verificar si ya existe
    const docSnap = await getDoc(salchipaperiaRef);

    if (docSnap.exists()) {
      await updateDoc(salchipaperiaRef, {
        cant: cantidadTotal
      });
      console.log("Documento actualizado correctamente");
    } else {
      await setDoc(salchipaperiaRef, {
        nombre: nombre,
        cant: cantidadTotal
      });
      console.log("Documento creado correctamente");
    }
  } catch (error) {
    console.error("Error al guardar los datos en Firebase:", error);
  }
}

async function getTopSalchipaperias() {
  try {
    const salchipaperiasRef = collection(db, "salchipaperias");
    const topSalchipaperiasQuery = query(salchipaperiasRef, orderBy("cant", "desc"), limit(10));
    const querySnapshot = await getDocs(topSalchipaperiasQuery);
    
    const salchipaperias = [];
    querySnapshot.forEach((doc) => {
      salchipaperias.push({
        nombre: doc.data().nombre,
        cant: doc.data().cant
      });
    });
    
    renderTable(salchipaperias);
  } catch (error) {
    console.error("Error al obtener las top salchipaperías:", error);
  }
}

// Función para renderizar la tabla en el HTML
function renderTable(salchipaperias) {
  const tableContainer = document.getElementById("top-salchipaperias-table");
  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Posición</th>
          <th>Nombre</th>
          <th>Cantidad de Salchipapas</th>
        </tr>
      </thead>
      <tbody>
  `;

  salchipaperias.forEach((salchipaperia, index) => {
    tableHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${salchipaperia.nombre}</td>
        <td>${salchipaperia.cant}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  tableContainer.innerHTML = tableHTML;
}

function verificarDesbloqueos(){
  if(totalSalchipapas >= 10){
    document.getElementById("granjaPapasBtn").disabled = false;
  }
  if(totalSalchipapas >= 85){
    document.getElementById("fabricaSalchichasBtn").disabled = false;
  }
  if(totalSalchipapas >= 237){
    document.getElementById("criaderoCodornicesBtn").disabled = false;
  }
  if(totalSalchipapas >= 465){
    document.getElementById("casaCerdosBtn").disabled = false;
  }
  if(totalSalchipapas >= 769){
    document.getElementById("lecheriaBtn").disabled = false;
  }
  if(totalSalchipapas >= 1149){
    document.getElementById("cultivoMaizBtn").disabled = false;
  }
  if(totalSalchipapas >= 1605){
    document.getElementById("fabricaEmulsionBtn").disabled = false;
  }
  if(totalSalchipapas >= 2137){
    document.getElementById("maquinaHeladosBtn").disabled = false;
  }
  if(totalSalchipapas >= 2745){
    document.getElementById("plantacionTomatesBtn").disabled = false;
  }
  if(totalSalchipapas >= 3429){
    document.getElementById("plantaNuclearBtn").disabled = false;
  }
  if(totalSalchipapas >= 4189){
    document.getElementById("fabricaTarroBtn").disabled = false;
  }
  if(totalSalchipapas >= 5025){
    document.getElementById("laboratorioNatillaBtn").disabled = false;
  }
  if(totalSalchipapas >= 5937){
    document.getElementById("fabricaTejidosBtn").disabled = false;
  }
  if(totalSalchipapas >= 6937){
    document.getElementById("mirellaBtn").disabled = false;
  }
}


function updateProduccionPorSegundo(){
  salchipapasPerSecond = 
  (cant_granja_de_papas * prod_granja_de_papas) + 
  (cant_fabrica_de_salchichas * prod_fabrica_de_salchichas) + 
  (cant_criadero_de_codornices * prod_criadero_de_codornices) +
  (cant_casa_de_cerdos * prod_casa_de_cerdos) + 
  (cant_lecheria * prod_lecheria) +
  (cant_cultivo_de_maiz_genetico * prod_cultivo_de_maiz_genetico) +
  (cant_fabrica_de_emulsion_de_scott * prod_fabrica_de_emulsion_de_scott) +
  (cant_maquinas_de_helados_de_chicle * prod_maquinas_de_helados_de_chicle) +
  (cant_plantacion_de_tomates * prod_plantacion_de_tomates) + 
  (cant_planta_nuclear_de_uranio_235u * prod_planta_nuclear_de_uranio_235u) + 
  (cant_fabrica_de_tarro_carmesi * prod_fabrica_de_tarro_carmesi) + 
  (cant_laboratorio_de_natilla * prod_laboratorio_de_natilla) +
  (cant_fabrica_de_tejidos_extraños * prod_fabrica_de_tejidos_extraños) +
  (cant_mirella_dimensional * prod_mirella_dimensional);
  updateUI();
}

//Funciones de compra de mejoras
function comprarGranjaPapas(){
  if(currentSalchipapas >= cst_granja_de_papas){
    currentSalchipapas -= cst_granja_de_papas;
    cant_granja_de_papas++;
    cst_granja_de_papas += 0.5;
    document.getElementById("granjaPapasCosto").innerText = cst_granja_de_papas;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarFabricaSalchichas(){
  if(currentSalchipapas >= cst_fabrica_de_salchichas){
    currentSalchipapas -= cst_fabrica_de_salchichas;
    cant_fabrica_de_salchichas++;
    cst_fabrica_de_salchichas += 1;
    document.getElementById("fabricaSalchichasCosto").innerText = cst_fabrica_de_salchichas;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarCriaderoCodornices(){
  if(currentSalchipapas >= cst_criadero_de_codornices){
    currentSalchipapas -= cst_criadero_de_codornices;
    cant_criadero_de_codornices++;
    cst_criadero_de_codornices += 1.5;
    document.getElementById("criaderoCodornicesCosto").innerText = cst_criadero_de_codornices;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarCasaCerdos(){
  if(currentSalchipapas >= cst_casa_de_cerdos){
    currentSalchipapas -= cst_casa_de_cerdos;
    cant_casa_de_cerdos++;
    cst_casa_de_cerdos += 2;
    document.getElementById("casaCerdosCosto").innerText = cst_casa_de_cerdos;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarLecheria(){
  if(currentSalchipapas >= cst_lecheria){
    currentSalchipapas -= cst_lecheria;
    cant_lecheria++;
    cst_lecheria += 2;
    document.getElementById("lecheriaCosto").innerText = cst_lecheria;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarCultivoMaiz(){
  if(currentSalchipapas >= cst_cultivo_de_maiz_genetico){
    currentSalchipapas -= cst_cultivo_de_maiz_genetico;
    cant_cultivo_de_maiz_genetico++;
    cst_cultivo_de_maiz_genetico += 2.5;
    document.getElementById("cultivoMaizCosto").innerText = cst_cultivo_de_maiz_genetico;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarFabricaEmulsion(){
  if(currentSalchipapas >= cst_fabrica_de_emulsion_de_scott){
    currentSalchipapas -= cst_fabrica_de_emulsion_de_scott;
    cant_fabrica_de_emulsion_de_scott++;
    cst_fabrica_de_emulsion_de_scott += 3;
    document.getElementById("fabricaEmulsionCosto").innerText = cst_fabrica_de_emulsion_de_scott;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarMaquinaHelados(){
  if(currentSalchipapas >= cst_maquinas_de_helados_de_chicle){
    currentSalchipapas -= cst_maquinas_de_helados_de_chicle;
    cant_maquinas_de_helados_de_chicle++;
    cst_maquinas_de_helados_de_chicle += 3.5;
    document.getElementById("maquinaHeladosCosto").innerText = cst_maquinas_de_helados_de_chicle;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarPlantacionTomates(){
  if(currentSalchipapas >= cst_plantacion_de_tomates){
    currentSalchipapas -= cst_plantacion_de_tomates;
    cant_plantacion_de_tomates++;
    cst_plantacion_de_tomates += 4;
    document.getElementById("plantacionTomatesCosto").innerText = cst_plantacion_de_tomates;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarPlantaNuclear(){
  if(currentSalchipapas >= cst_planta_nuclear_de_uranio_235u){
    currentSalchipapas -= cst_planta_nuclear_de_uranio_235u;
    cant_planta_nuclear_de_uranio_235u++;
    cst_planta_nuclear_de_uranio_235u += 4.5;
    document.getElementById("plantaNuclearCosto").innerText = cst_planta_nuclear_de_uranio_235u;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarFabricaTarro(){
  if(currentSalchipapas >= cst_fabrica_de_tarro_carmesi){
    currentSalchipapas -= cst_fabrica_de_tarro_carmesi;
    cant_fabrica_de_tarro_carmesi++;
    cst_fabrica_de_tarro_carmesi += 5;
    document.getElementById("fabricaTarroCosto").innerText = cst_fabrica_de_tarro_carmesi;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarLaboratorioNatilla(){
  if(currentSalchipapas >= cst_laboratorio_de_natilla){
    currentSalchipapas -= cst_laboratorio_de_natilla;
    cant_laboratorio_de_natilla++;
    cst_laboratorio_de_natilla += 5.5;
    document.getElementById("laboratorioNatillaCosto").innerText = cst_laboratorio_de_natilla;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarFabricaTejidos(){
  if(currentSalchipapas >= cst_fabrica_de_tejidos_extraños){
    currentSalchipapas -= cst_fabrica_de_tejidos_extraños;
    cant_fabrica_de_tejidos_extraños++;
    cst_fabrica_de_tejidos_extraños += 5.5;
    document.getElementById("FabricaTejidosCosto").innerText = cst_fabrica_de_tejidos_extraños;
    updateProduccionPorSegundo();
    updateUI();
  }
}

function comprarMirella(){
  if(currentSalchipapas >= cst_mirella_dimensional){
    currentSalchipapas -= cst_mirella_dimensional;
    cant_mirella_dimensional++;
    cst_mirella_dimensional += 5.5;
    document.getElementById("mirellaCosto").innerText = cst_mirella_dimensional;
    updateProduccionPorSegundo();
    updateUI();
  }
}

