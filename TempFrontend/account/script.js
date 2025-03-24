let passwordInputted = false;
let password = "";

fetch("/api/account")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").value = data.username;
    document.getElementById("tag").innerText = "#" + data.id;
    document.getElementById("password").value = data.password;
  })
  .catch((error) => console.error(error));

function changePassword() {
  if (!passwordInputted) {
    console.log("Checking password...");
    password = document.getElementById("password").value;
    fetch("/api/account/changepassword", {
      method: "POST",
      body: JSON.stringify({ password, input: true }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          passwordInputted = true;
          document.getElementById("passwordButton").innerText = "Change";
          document.getElementById("password").value = "";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  } else {
    console.log("Changing password...");
    const newPassword = document.getElementById("password").value;
    fetch("/api/account/changepassword", {
      method: "POST",
      body: JSON.stringify({ newPassword, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Password changed successfully!");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  }
}
