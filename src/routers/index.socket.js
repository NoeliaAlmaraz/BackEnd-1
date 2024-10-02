import { socketServer } from "../../server.js";


let allMesagges = [{
        username: "noelia",
        message: "Inicio del chat"
}

];

const socketCb = (socket) => {
    console.log(socket.id);
    socket.emit("all messages", [...allMesagges].reverse().slice(0,10).reverse());

    socket.on("send message", (text) => {
        allMesagges.push(text);
        socketServer.emit("all messages", [...allMesagges].reverse().slice(0,10).reverse());
    })
}
     

export default socketCb;