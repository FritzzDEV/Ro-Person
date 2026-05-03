import { auth } from "./auth.js";

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const overlay = document.getElementById("profileOverlay");
const logo = document.getElementById("logo");

// SIDEBAR
let open = false;
export function toggleSidebar() {
  open = !open;
  sidebar.classList.toggle("open");
  toggleBtn.classList.toggle("shift");
}

// PROFILE OVERLAY
export function toggleProfile() {
  overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
}

overlay.addEventListener("click", (e) => {
  if (e.target.id === "profileOverlay") {
    overlay.style.display = "none";
  }
});

// LOGO FADE
setTimeout(() => {
  logo.style.display = "none";
}, 4000);