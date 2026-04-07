
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
getFirestore,
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMOFzxcFVAS9cUTyZMWb91xnm0a2sEIJo",
  authDomain: "ecowrap-d06e0.firebaseapp.com",
  projectId: "ecowrap-d06e0",
  storageBucket: "ecowrap-d06e0.firebasestorage.app",
  messagingSenderId: "729333812617",
  appId: "1:729333812617:web:b4eb3630b66eac08e36558"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// read URL parameters
const params = new URLSearchParams(window.location.search);
const code = params.get("code");



const docRef = doc(db, "foodItems", code);
const docSnap = await getDoc(docRef);

if (!code) {

  document.getElementById("info").innerText = "No QR code provided.";

}

else if (docSnap.exists()) {

  const data = docSnap.data();

  document.getElementById("info").innerHTML =
    "Food: " + data.foodName + "<br>" +
    "Prepared: " + formatDateTime(data.prepTime) + "<br>" +
    "Best before: " + formatDateTime(data.bestBefore) + "<br>" +
    "Details: " + data.details;

}

else {

  document.getElementById("info").innerText =
    "This EcoWrap is brand new! You can claim it by filling out the form below.";

  document.getElementById("claimForm").style.display = "block";

}

window.claimItem = async function () {

  const foodName = document.getElementById("foodName").value;
  const prepTime = document.getElementById("prepTime").value;
  const bestBefore = document.getElementById("bestBefore").value;
  const details = document.getElementById("details").value;

  await setDoc(doc(db, "foodItems", code), {
    foodName: foodName,
    prepTime: prepTime,
    bestBefore: bestBefore,
    details: details
  });

  location.reload();

}

window.goToCode = function () {

  const code = document.getElementById("testCode").value;

  if (!code) {
    alert("Please enter a serial code");
    return;
  }

  window.location.href = "?code=" + code;

};

function formatDateTime(datetimeString) {

  const date = new Date(datetimeString);

  return date.toLocaleString("en-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

}

windows.toggleDebug = function () {

  const panel = document.getElementById("Debug");

  if (panel.style.display === "none") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }

}