// main.js
function showLayer(id) {
  document.querySelectorAll('.layer').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
  showLayer('prompt-layer');
});