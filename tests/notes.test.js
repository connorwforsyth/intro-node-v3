import { beforeEach, jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
	insertDB: jest.fn(),
	saveDB: jest.fn(),
	getDB: jest.fn(),
}));

const { insertDB, saveDB, getDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/crud.js");

beforeEach(() => {
	insertDB.mockClear();
	getDB.mockClear();
	saveDB.mockClear();
});

test("New note inserts data and returns it", async () => {
	const note = "Test note";
	const tags = ["test", "note"];
	const data = {
		content: note,
		id: Date.now(),
		tags,
	};

	insertDB.mockResolvedValue(data);

	const result = await newNote(data.content, data.tags);
	expect(result.content).toEqual(note.content);
	expect(result.tags).toEqual(tags);
});
