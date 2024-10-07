import fs from "fs";
import crypto from "crypto";

class UsersManager {
    constructor(path){
        this.path = path;
        this.exists;
    }

    exists(){
        const exists = fs.existsSync(this.path);
        if (!exists) {
          fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
          console.log("The file already exists.");
        }
    }


    async createUsers(data) {
        try {
            const allUsers = await this.readAllUsers();

            let newId;
            let idExists;
    
            do {
                newId = crypto.randomBytes(12).toString("hex");
                idExists = allUsers.some(user => user.id === newId);
            } while (idExists); 
    
            data.id = newId;

            allUsers.push(data);
            await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2));
            return {messageSuccess: "User created successfully", data: data};
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

    async readOneUserByEmail(email) {
        try {
            const allUsers = await this.readAllUsers();
            const oneUser = allUsers.find(user => user.email === email);
            return oneUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateUser(id, updatedData) {
        try {
          const allUsers = await this.readAllUsers(); 
          const index = allUsers.findIndex((user) => user.id === id);
          if (index < 0) {
            return null;
          }
          allUsers[index] = { ...allUsers[index], ...updatedData }; 
          await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2)); 
          return { user: allUsers[index], message: "User updated successfully" };
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
            return {id: id, message: "User deleted successfully"};
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async getOnlineUsers() {
        const users = await this.readAllUsers();
        return users.filter(user => user.isOnline === true);
      }
    

}

const usersManager = new UsersManager("./src/data/files/users.json");

export default usersManager;