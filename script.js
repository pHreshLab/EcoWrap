
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
async function loadPage() {

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const mode = params.get("mode");

  // No code
  if (!code) {
    document.getElementById("info").innerText = "No code is found.";
    return;
  }

  // DEMO MODE (skip Firebase completely)
  if (mode === "demo") {

    document.getElementById("info").innerHTML =
      "<b>Demo Mode</b><br>Try filling the form below.";

    document.getElementById("claimForm").style.display = "block";

    return; 
  }

  // NORMAL MODE → Firebase runs here ONLY
  const docRef = doc(db, "foodItems", code);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const data = docSnap.data();

    document.getElementById("info").innerHTML =
      "Food: " + data.foodName + "<br>" +
      "Prepared: " + formatDateTime(data.prepTime) + "<br>" +
      "Best before: " + formatDateTime(data.bestBefore) + "<br>" +
      "Details: " + data.details;

  } else {

    document.getElementById("info").innerText =
      "This EcoWrap is brand new! You can claim it by filling out the form below.";

    document.getElementById("claimForm").style.display = "block";

  }

}

// run it
loadPage();

window.claimItem = async function () {

  if (mode === "demo") {

    // redirect to demo notice page
    window.location.href = "demo.html";
    return;

  }

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

window.toggleDebug = function () {

  const panel = document.getElementById("Debug");

  if (panel.style.display === "none") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }

}