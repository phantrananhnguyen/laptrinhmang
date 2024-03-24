import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtKwWjO8hIVun7DV9ovRqGH6Z-mlOrkqw",
  authDomain: "datanum2.firebaseapp.com",
  projectId: "datanum2",
  storageBucket: "datanum2.appspot.com",
  messagingSenderId: "238795042115",
  appId: "1:238795042115:web:800b6555ba3e9dd52bd3f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const form = document.getElementById("registrationForm");
console.log("submit button clicked");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = form["fullName"].value;
  const email = form["email"].value;
  const password = form["password"].value;
  const confirmPassword = form["confirmPassword"].value;
  if (password !== confirmPassword) {
    alert("Password and confirm password do not match.");
    return;
  }

  const newUserId = push(ref(database, "users")).key; // Tạo một ID mới cho người dùng

  set(ref(database, `users/${newUserId}`), {
    fullName: fullName,
    email: email,
    password: password,
  })
    .then(() => {
      alert("Registration successful!");
      form.reset();
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again later.");
    });
});
