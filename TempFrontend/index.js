let timer = 0;
let loggedIn = false;
let username = "";
let expireDate = 0

document.addEventListener("DOMContentLoaded", () => {
  // Check for a cookie, and if there is one, send a request to /api/greeting for the name with the cookie
  fetch("/api/greeting", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((data) => {
      expireDate = data.expirationDate
      timer = Math.floor( (expireDate - Date.now()) / 1000 );
      username = data.name ? data.name : "404 Not Found";
      loggedIn = true;
      updateGreeting()
    })
    .catch((err) => {
      console.error(err);
      loggedIn = false
      updateGreeting()
    });
});

function logout() {
  fetch("/api/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    window.location.href = "/";
  });
}

function updateGreeting() {
  if (loggedIn) {
    document.getElementById("greeting").textContent = `Hello, ${username}! ${timer} seconds to expiration`;
    document.getElementById("login-button").style.display = "none";
    document.getElementById("signup-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";
    document.getElementById("inbox-button").style.display = "block";
  } else {
    document.getElementById("greeting").textContent = "You are not logged in";
    document.getElementById("login-button").style.display = "block";
    document.getElementById("signup-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";
    document.getElementById("inbox-button").style.display = "none";
  }
}

let greetingUpdater = setInterval( () => {
  timer = Math.floor( (expireDate - Date.now()) / 1000 );
  if (timer < 1) {
    loggedIn = false
  }
  updateGreeting()
}, 1000)