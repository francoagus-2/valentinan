/* ===== Configuración (editable) ===== */
const INICIO = new Date(2024, 9, 17); // 17/10/2024 (los meses empiezan en 0)

const musica = document.getElementById('musica');
const btnMusica = document.getElementById('btnMusica');

/* ===== Inicio: botón "Comenzar" ===== */
document.getElementById('btnComenzar').addEventListener('click', () => {
  // La música se inicia dentro del clic, así el navegador la permite
  musica.volume = 0.6;
  musica.play().then(() => {
    btnMusica.hidden = false;
  }).catch(() => {
    console.warn('No se pudo reproducir assets/musica.mp3 (¿falta el archivo?)');
  });
  document.getElementById('inicio').classList.add('fuera');
  document.body.classList.remove('locked');
  document.body.classList.add('listo');
  window.scrollTo(0, 0);
});

/* ===== Control de música (pausa / reanuda sin reiniciar) ===== */
btnMusica.addEventListener('click', () => {
  if (musica.paused) { musica.play(); btnMusica.classList.remove('pausa'); }
  else { musica.pause(); btnMusica.classList.add('pausa'); }
});

/* ===== Aparición suave al hacer scroll ===== */
const obs = new IntersectionObserver((entradas) => {
  entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ver'); obs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.rev').forEach(el => obs.observe(el));

/* ===== Mensaje oculto ===== */
const btnSecreto = document.getElementById('btnSecreto');
const msg = document.getElementById('msgSecreto');
btnSecreto.addEventListener('click', () => {
  const abierto = msg.classList.toggle('abierto');
  btnSecreto.setAttribute('aria-expanded', abierto);
  btnSecreto.textContent = abierto ? 'Ocultar' : 'Tocá acá';
});

/* ===== Contador desde el 17/10/2024 ===== */
const $ = id => document.getElementById(id);
function actualizar() {
  const ahora = new Date();
  // Meses completos transcurridos
  let meses = (ahora.getFullYear() - INICIO.getFullYear()) * 12 + ahora.getMonth() - INICIO.getMonth();
  let ancla = new Date(INICIO.getFullYear(), INICIO.getMonth() + meses, INICIO.getDate());
  if (ancla > ahora) { meses--; ancla = new Date(INICIO.getFullYear(), INICIO.getMonth() + meses, INICIO.getDate()); }
  const resto = ahora - ancla;
  $('cMeses').textContent = meses;
  $('cDias').textContent = Math.floor(resto / 864e5);
  $('cHoras').textContent = Math.floor(resto / 36e5) % 24;
  $('cMin').textContent = Math.floor(resto / 6e4) % 60;
  $('cSeg').textContent = Math.floor(resto / 1e3) % 60;
  $('cTotal').textContent = 'En total: ' + Math.floor((ahora - INICIO) / 864e5).toLocaleString('es-AR') + ' días juntos.';
}
actualizar();
setInterval(actualizar, 1000);
