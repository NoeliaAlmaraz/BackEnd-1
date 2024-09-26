import usersManager from "../data/managers/users.manager.js";
import isValidDataMid from "../middlewares/isValidData.mid.js";

const socketCb = async (socket) => {
    console.log("socket connected id; "+socket.id)
    socket.on("registerUsers", async (usersdata) => {
        console.log(usersdata)
        const validatedData = isValidDataMid.validateUserData(usersdata);


        const responseManager = await usersManager.createUsers(validatedData);
        const allUsers = await usersManager.readAllUsers();
        socket.emit("updateUsers", allUsers); // Emitir la lista de usuarios
    })
    const allUsers = await usersManager.readAllUsers()
    socket.emit("updateUsers", allUsers)
}

export default socketCb