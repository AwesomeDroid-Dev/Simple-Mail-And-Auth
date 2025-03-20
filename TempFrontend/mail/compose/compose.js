document.addEventListener("DOMContentLoaded", () => {
  const composeForm = document.getElementById("composeForm");
  composeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
      to: document.getElementById("to").value,
      subject: document.getElementById("subject").value,
      body: document.getElementById("body").value,
    };
    console.log(formData)
    fetch("/api/mail/compose", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Email sent successfully!");
          window.location.href = "/mail";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  });
});
