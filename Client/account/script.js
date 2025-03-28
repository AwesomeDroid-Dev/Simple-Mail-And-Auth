let username = "";
let password = "";

const changePasswordHTML = `<label for="password">Password: </label><input class="input" type="text" id="password" name="password" placeholder="Enter new password" required />`;

fetch("/api/account")
  .then((response) => response.json())
  .then((data) => {
    username = data.username;
    document.getElementById("username").value = username;
    document.getElementById("tag").innerText = "#" + data.id;
    document.getElementById("password").value = data.password;
  })
  .catch((error) => console.error(error));

function changePassword() {
  console.log("Checking password...");
  password = document.getElementById("password").value;
  fetch("/api/account/checkPassword", {
    method: "POST",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        document.getElementsByClassName("password")[0].innerHTML =
          changePasswordHTML;
        document.getElementById("password").value = password;
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error(error));
}

const enterPasswordHTML = `<label for="password">Password: </label><input class="input" type="text" id="password" name="password" placeholder="Enter password to change password" required /><button type="button" onclick="changePassword()" id="passwordButton">Edit</button>`;

function enterPassword() {
  document.getElementsByClassName("password")[0].innerHTML = enterPasswordHTML;
}

function saveChanges(event) {
  event.preventDefault();
  let changes = {};
  if (username !== document.getElementById("username").value) {
    changes.username = document.getElementById("username").value;
  }
  if (password !== document.getElementById("password").value) {
    changes.password = document.getElementById("password").value;
  }
  fetch("/api/account/updateInfo", {
    method: "POST",
    body: JSON.stringify({ password, changes }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        password = document.getElementById("password").value;
        alert("Changes saved successfully!");
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error(error));
}
