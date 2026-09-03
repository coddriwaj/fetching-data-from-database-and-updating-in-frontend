
fetchEmails();
async function fetchEmails() {
const response = await fetch('/about', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
 const emails = await response.json();
  const list = document.getElementById('email-list');
  list.innerHTML = '';

  emails.forEach(email => {
    const li = document.createElement('li');
    li.textContent = email;
    list.appendChild(li);
  });
}
