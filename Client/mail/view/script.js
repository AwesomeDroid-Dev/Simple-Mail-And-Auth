console.log(new URLSearchParams(window.location.search).get("emailId"))

fetch(`/api/mail/view?emailId=${new URLSearchParams(window.location.search).get("emailId")}`)
  .then((response) => response.json())
  .then((data) => {
    if (!data.success) {
      alert(data.message);
    }
    emailData = data.mail;
    const emailContainer = document.getElementById("email");
    const emailSubject = document.createElement("h2");
    emailSubject.textContent = emailData.subject;
    emailContainer.appendChild(emailSubject);
    const emailFrom = document.createElement("p");
    emailFrom.textContent = `From: ${emailData.from}`;
    emailContainer.appendChild(emailFrom);
    const emailTo = document.createElement("p");
    emailTo.textContent = `To: ${emailData.to}`;
    emailContainer.appendChild(emailTo);
    const emailBody = document.createElement("p");
    emailBody.textContent = emailData.body;
    emailContainer.appendChild(emailBody);
  });