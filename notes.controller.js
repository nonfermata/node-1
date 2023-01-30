const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString()
    };
    notes.push(note);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.greenBright(`The note "${title}" is successfully added`));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.white.bgCyan.bold("This is the list of notes:"));
    notes.forEach((note) => {
        console.log(chalk.blue(note.id), chalk.cyan(note.title));
    });
}

async function removeNote(id) {
    const notes = await getNotes();
    const newNotes = notes.filter((note) => note.id !== String(id));
    if (notes.length === newNotes.length) {
        console.log(chalk.redBright(`Id "${id}" was not found`));
    } else {
        await fs.writeFile(notesPath, JSON.stringify(newNotes));
        console.log(
            chalk.magenta(
                `The note "${
                    notes.find((n) => n.id === String(id)).title
                }" was removed`
            )
        );
    }
}

module.exports = {
    addNote,
    printNotes,
    removeNote
};
