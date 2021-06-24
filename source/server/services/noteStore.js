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

    async create(title, description, date, importance) {
        const note = new Note(title, description, date, importance);
        return this.db.insert(note);
    }

    async update(id, {title, description, date, importance, completed}) {
        const updateData = {
            ...(title === null ? null : {title}),
            ...(description === null ? null : {description}),
            ...(date === null ? null : {date: new Date(date)}),
            ...(importance === null ? null : {importance}),
            ...(completed === null ? null : {completed}),
        };
        await this.db.update({_id: id}, {$set: updateData});
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
