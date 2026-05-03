import { auth, db, logout } from "./auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function changeName() {
  const newNameVal = document.getElementById("newName").value;

  if (!newNameVal || !auth.currentUser) return;

  await setDoc(doc(db, "users", auth.currentUser.uid), {
    name: newNameVal
  }, { merge: true });

  alert("Name updated 😏");
}

export async function loadProfileUI(user) {
  const snap = await getDoc(doc(db, "users", user.uid));
  const name = snap.exists() ? snap.data().name : "User";

  document.getElementById("userEmail").innerText = "Email: " + user.email;
  document.getElementById("userName").innerText = "Name: " + name;

  const welcome = document.getElementById("welcomeText");
  welcome.style.display = "block";
  welcome.innerText = "Welcome " + name;
}

export function logoutUser() {
  return logout();
}