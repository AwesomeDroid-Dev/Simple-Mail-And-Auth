let inbox = [
  {
    id: 13048,
    from: "John Doe",
    subject: "Hello",
    body: "Hello, how are you?",
  },
  { id: 13049, from: "Jane Doe", subject: "Hi", body: "Hi, how are you?" },
  {
    id: 13050,
    from: "Bob Smith",
    subject: "Test",
    body: "This is a test email",
  },
  {
    id: 13051,
    from: "Alice Brown",
    subject: "Test 2",
    body: "This is a test email 2",
  },
];

const inboxList = document.getElementById("inbox");
const emailListItems = inbox.map((email) => {
  const emailListItem = document.createElement("li");
  const emailLink = document.createElement("a");
  emailLink.href = `/mail/view?emailId=${email.id}`;
  emailLink.textContent = `${email.from} - ${email.subject}`;
  emailLink.style.textDecoration = "none";
  emailLink.style.color = "black";
  emailListItem.appendChild(emailLink);
  return emailListItem;
});
inboxList.append(...emailListItems);

updateInbox()

function updateInbox() {
  fetch("/api/mail")
    .then((response) => response.ok ? response.json() : inbox)
    .then((data) => {
      inbox = data;
      inboxList.innerHTML = "";
      const emailListItems = inbox.map((email) => {
        const emailListItem = document.createElement("li");
        const emailLink = document.createElement("a");
        emailLink.href = `/mail/view?emailId=${email.id}`;
        emailLink.textContent = `${email.from} - ${email.subject}`;
        emailLink.style.textDecoration = "none";
        emailLink.style.color = "black";
        emailListItem.appendChild(emailLink);
        return emailListItem;
      });
      inboxList.append(...emailListItems);
    });
}