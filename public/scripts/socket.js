
const socket = io();

let username = "";

Swal.fire({
    title : "Enter your name",
    input: "text",
    allowOutsideClick: false,

    inputValidator: (value) => {
        if (!value) {
            return "You need to write something!"
        }
    }

}).then((data) => {
    username = data.value;
    document.querySelector("#username").innerHTML = username;

})

socket.on("all messages", data => {
    console.log(data);
    data = data.map(each => ` <p class="bg-white p-1 m-2">
      ${each.username}: ${each.message}
    </p>` ).join("")
    document.querySelector("#messages").innerHTML = data;

})

document.querySelector("#text").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const text = document.querySelector("#text").value;
        socket.emit("send message", {username,message: text});
        event.target.value = "";
    }
})
