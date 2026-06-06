import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

// We want to make a few helper functions to read and write to our db.json file. This will make it easier to work with the data in our app.

const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

const insertDB = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
};

export { getDB, insertDB, saveDB };
