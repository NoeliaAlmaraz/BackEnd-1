import usersManager from "../data/managers/users.manager.js";

const socketCb = async (socket) => {
    console.log("socket connected id; "+socket.id)
    socket.on("registerUsers", async (usersdata) => {
        console.log(usersdata)
        const responseManager = await usersManager.createUsers(usersdata)
        const allUsers = await usersManager.readAllUsers()
        socket.emit("updateUsers", allUsers)
    })
    const allUsers = await usersManager.readAllUsers()
    socket.emit("updateUsers", allUsers)
}

export default socketCb