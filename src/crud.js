import { getDB, insertDB, saveDB } from "./db.js";

const newNote = async (note, tags) => {
  const newNote = {
    id: Date.now(),
    content: note,
    tags,
  };
  await insertDB(newNote);
  return newNote;
};

const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

const findNotes = async (filter) => {
  const { notes } = await getDB();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);
  if (match) {
    const remainingNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: remainingNotes });
  }
};

const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};

export { findNotes, getAllNotes, newNote, removeAllNotes, removeNote };
