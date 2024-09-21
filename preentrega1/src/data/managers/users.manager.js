import fs from "fs";
import crypto from "crypto";


class UsersManager {
    constructor(path) {
        this.path = path;
        this.exists();
    }

    exists() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            console.log("The file already exists.");
        }
    }

    async createUsers(data) {
        try {
            data.id = crypto.randomBytes(12).toString("hex");
            const allUsers = await this.readAllUsers();
            allUsers.push(data);
            await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2));
            return data.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readAllUsers(role) {
        try {
            const users = await fs.promises.readFile(this.path, "utf-8");
            const parseUsers = JSON.parse(users);
            if (role) {
                const filteredUsers = parseUsers.filter(user => user.role === role);
                return filteredUsers;
            } else {
                return parseUsers;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readOneUsers(id) {
        try {
            const allUsers = await this.readAllUsers();
            const oneUser = allUsers.find(user => user.id === id);
            return oneUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUsers(id, updatedData) {
        try {
            const allUsers = await this.readAllUsers();
            const index = allUsers.findIndex(user => user.id === id);
            if (index < 0) {
                return null;
            }
            allUsers[index] = { ...allUsers[index], ...updatedData };
            await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2));
            return allUsers[index];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUsers(id) {
        try {
            const allUsers = await this.readAllUsers();
            const filteredUsers = allUsers.filter(user => user.id !== id);
            if (allUsers.length === filteredUsers.length) {
                return null;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(filteredUsers, null, 2));
            console.log(`User con id ${id} eliminado.`);
            return id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const usersManager = new UsersManager("./src/data/files/users.json");

export default usersManager;