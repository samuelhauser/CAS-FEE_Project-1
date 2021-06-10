import Datastore from 'nedb-promise';
import Note from '../schema/noteModel.js';

class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async all() {
        return this.db.find({});
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async create(title, description) {
        const note = new Note(title, description, new Date());
        return this.db.insert(note);
    }

    async update(id, {title, description}) {
        await this.db.update({_id: id}, {$set: {title, description}});
        return this.get(id);
    }

    async delete(id) {
        const note = await this.get(id);
        // eslint-disable-next-line no-underscore-dangle
        delete note._id;

        await this.db.remove({_id: id});
        return note;
    }
}

export const noteStore = new NoteStore();
