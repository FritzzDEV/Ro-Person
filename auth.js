import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyASbtQMfIUcjs6Hb76zgq3S0pWvmrNixuQ",
  authDomain: "roperson-solaris.firebaseapp.com",
  projectId: "roperson-solaris",
  storageBucket: "roperson-solaris.firebasestorage.app",
  messagingSenderId: "843721651672",
  appId: "1:843721651672:web:3dc75308ac16b441146ead"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// LOGIN
export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  if (!cred.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email first 📩");
  }

  return cred;
}

// SIGNUP
export async function signup(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  const username = "User" + Math.floor(1000 + Math.random() * 9000);

  await setDoc(doc(db, "users", cred.user.uid), {
    name: username,
    email,
    verificationPending: true
  });

  await sendEmailVerification(cred.user);
  await signOut(auth);

  return cred;
}

// AUTH LISTENER (CLEAN STATE CONTROL)
export function listenAuth(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return callback(null);

    await user.reload(); // ensures fresh verification state

    if (!user.emailVerified) {
      await signOut(auth);
      return callback(null);
    }

    callback(user);
  });
}

// LOGOUT
export function logout() {
  return signOut(auth);
}

// RESEND VERIFICATION (SAFE)
export async function resendVerification() {
  if (!auth.currentUser) return;
  await sendEmailVerification(auth.currentUser);
}