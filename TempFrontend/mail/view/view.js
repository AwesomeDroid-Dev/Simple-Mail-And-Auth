const emailData = {
  id: 13048,
  from: "John Doe",
  subject: "Hello",
  body: "Hello, how are you?",
};

document.addEventListener("DOMContentLoaded", () => {
  const emailContainer = document.getElementById("email");
  
  const emailSubject = document.createElement("h2");
  emailSubject.textContent = emailData.subject;

  const emailFrom = document.createElement("p");
  emailFrom.textContent = `From: ${emailData.from}`;

  const emailBody = document.createElement("p");
  emailBody.textContent = emailData.body;

  emailContainer.appendChild(emailSubject);
  emailContainer.appendChild(emailFrom);
  emailContainer.appendChild(emailBody);
});

