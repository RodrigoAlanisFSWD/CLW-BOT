import { JSONFile, Low } from 'lowdb'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

let db;

const __dirname = dirname(fileURLToPath(import.meta.url))

export const createConnection = async () => {
    const file = join(__dirname, '../db.json')
    const adapter = new JSONFile(file)

    db = new Low(adapter)

    await db.read()
    
    db.data ||= {users: []}

    await db.write()
}

export const getConnection = () => db