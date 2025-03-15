document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    var data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      response.json().then(function (data) {
        if (data.success) {
          document.cookie = `userId=${data.userId}; Path=/; SameSite=Strict`;
          window.location.href = "/";
        } else {
          alert(data.message);
        }
      });
    });
  });

function validateForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username === "" || password === "") {
    alert("Both fields are required.");
    return false;
  }
  return true;
}
