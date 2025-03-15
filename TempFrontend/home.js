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
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("greeting").textContent =
        "Failed to fetch greeting";
    });
});