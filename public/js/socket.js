const socket = io();

document.querySelector("#registerUsers").addEventListener("click", async () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const photo = document.querySelector("#photo").value;

  const usersdata = {
    name,
    email,
    password,
    photo,
  };
  socket.emit("registerUsers", usersdata);
}); 

socket.on("updateUsers", (allUsers) => {

  const users = document.querySelector("#updateUsers");
  users.innerHTML = allUsers.map(each => `
    <li>
      <strong>Name:</strong> ${each.name}<br>
      <strong>Email:</strong> ${each.email}<br>
      <strong>Photo:</strong> <img src="${each.photo}" alt="${each.name}" width="50">
    </li>
  `).join("") + `</ul>`;

  
});