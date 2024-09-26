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

  // Toma solo los últimos 6 usuarios
  const latestUsers = allUsers.slice(-6).reverse();

  users.innerHTML = `
    <h3>Últimos Usuarios</h3>
    <ul>
      ${latestUsers
        .map(
          (each) => `
        <li>
          <strong>Name:</strong> ${each.name}<br>
          <strong>Email:</strong> ${each.email}<br>
          <strong>Role:</strong> ${each.role}<br>
          <strong>Photo:</strong> <img src="${each.photo}" alt="${each.name}" width="50">
          <a href="/users/${each.id}">
            <button type="button" class="btn btn-outline-success">Details user</button>
          </a>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
});
