import fs from 'fs';
import path from 'path';

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profession: 'doctor'|'nurse'|'technician'|'receptionist';
};

type DBShape = { users: User[] };

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function read(): DBShape {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
  }
  const raw = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(raw) as DBShape;
}

function write(db: DBShape) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

export const DB = {
  getUserByEmail(email: string) {
    const db = read();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },
  addUser(user: User) {
    const db = read();
    db.users.push(user);
    write(db);
    return user;
  },
  updateUserPassword(email: string, passwordHash: string) {
    const db = read();
    const idx = db.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx >= 0) {
      db.users[idx].passwordHash = passwordHash;
      write(db);
      return true;
    }
    return false;
  }
};
