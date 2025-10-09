const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const screenDisplay = document.getElementById("screen");
const viewportDisplay = document.getElementById("viewport");

function updateDimensions() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    /* Code test
    if (screenDisplay) {
        screenDisplay.textContent = `Résolution : ${window.screen.width} x ${window.screen.height}`;
    }
    if (viewportDisplay) {
        viewportDisplay.textContent = `Fenêtre visible : ${vw} x ${vh}`;
    }*/

    // Met à jour les variables globales
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // Applique directement les dimensions aux containers
    if (container1) {
        container1.style.width = `${vw}px`;
        container1.style.height = `${vh}px`;
    }
    if (container2) {
        container2.style.width = `${vw}px`;
        container2.style.height = `${vh}px`;
    }
}
updateDimensions();
window.addEventListener("resize", updateDimensions);