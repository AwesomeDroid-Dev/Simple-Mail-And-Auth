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
      if (data.name) {
        document.getElementById(
          "greeting"
        ).textContent = `Hello, ${data.name}!`;
        document.getElementById("login-button").style.display = "none";
        document.getElementById("signup-button").style.display = "none";
        document.getElementById("logout-button").style.display = "block";
      } else {
        document.getElementById("logout-button").style.display = "none";
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("greeting").textContent =
        "You are not logged in";
      document.getElementById("login-button").style.display = "block";
      document.getElementById("signup-button").style.display = "block";
      document.getElementById("logout-button").style.display = "none";
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