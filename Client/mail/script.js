let inbox = [
  {
    id: 13048,
    from: "John Doe",
    subject: "Hello",
    body: "Hello, how are you?",
  }
];

const inboxList = document.getElementById("inbox");
inboxList.innerHTML = "Loading...";

updateInbox()

async function updateInbox() {
  const response = await fetch("/api/mail");
  if (!response.ok) {
    inboxList.innerHTML = "Error loading emails";
    return;
  }
  const data = await response.json();
  if (data.length === 0) {
    inboxList.innerHTML = "No emails";
    return;
  }
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
}