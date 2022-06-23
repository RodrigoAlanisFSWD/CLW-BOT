import { getConnection } from "../db.js"
import { v4 as uuidv4 } from 'uuid';

class UserService {

    async createUser(from) {
        const db = getConnection()

        db.data.users.push({
            id: uuidv4(),
            from,
        })

        await db.write()
    }

    existUser(from) {
        const db = getConnection()

        return db.data.users.find((user) => user.from === from)
    }

    async deleteUser(from) {
        const db = getConnection()

        const newUsers = db.data.users.filter((user) => user.from !== from)

        db.data.users = newUsers

        await db.write()
    }

    getUserIndex(user) {
        const db = getConnection()

        return db.data.users.findIndex((u) => u.id === user.id)
    }

    findUser(from) {
        const db = getConnection()

        return db.data.users.find((u) => u.from === from)
    }

}

export default new UserService()