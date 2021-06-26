import Datastore from 'nedb-promise';
import Note from '../schema/noteModel.js';

class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async all() {
        return this.db.cfind({}).sort({title: 1}).exec();
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async create(data) {
        const note = new Note(data);
        return this.db.insert(note);
    }

    async update(id, data) {
        await this.db.update({_id: id}, {$set: data});
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
