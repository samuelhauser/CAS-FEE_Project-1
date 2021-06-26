import {httpService} from '../services/http-service.js';
import {sortItemsBy} from '../utils/sorting.js';

class NoteModel {
    constructor() {
        this.sortingStorageKey = 'note-sorting';
        this.completedStorageKey = 'note-completed';
        this.notes = [];
    }

    loadData() {
        httpService.get('GET', '/api/notes').then((data) => {
            this.notes = data.map((value) => {
                const {date, crdate, ...rest} = value;
                return {date: new Date(date), crdate: new Date(crdate), ...rest};
            });
            this.onNotesUpdated();
        });
    }

    get sorting() {
        return localStorage.getItem(this.sortingStorageKey) || 'title';
    }

    set sorting(value) {
        localStorage.setItem(this.sortingStorageKey, value);
    }

    get completed() {
        return !!JSON.parse(localStorage.getItem(this.completedStorageKey)) || false;
    }

    set completed(value) {
        localStorage.setItem(this.completedStorageKey, JSON.stringify(value ? 1 : 0));
    }

    get sortedAndFilteredNotes() {
        let filteredNodes = this.notes;
        if (!this.completed) {
            filteredNodes = filteredNodes.filter((note) => note.completed === false);
        }
        filteredNodes = sortItemsBy(filteredNodes, this.sorting);
        return filteredNodes;
    }

    bindNotesUpdated(callback) {
        this.onNotesUpdated = callback;
    }

    switchSorting(sorting) {
        this.sorting = sorting;
        this.onNotesUpdated();
    }

    switchCompleted(completed) {
        this.completed = completed;
        this.onNotesUpdated();
    }

    // eslint-disable-next-line class-methods-use-this
    async getNote(id) {
        const response = await httpService.get('GET', `/api/notes/${id}`);
        const {date: newDate, crdate, ...rest} = response;
        return {date: new Date(newDate), crdate: new Date(crdate), ...rest};
    }

    async createNote(data) {
        const response = await httpService.get('POST', '/api/notes', data);
        const {date: newDate, crdate, ...rest} = response;

        this.notes.push({date: new Date(newDate), crdate: new Date(crdate), ...rest});
        this.onNotesUpdated();
    }

    async updateNote(data) {
        const {id, ...updateData} = data;
        const response = await httpService.get('PATCH', `/api/notes/${id}`, updateData);
        const {date: newDate, crdate, ...rest} = response;

        // eslint-disable-next-line no-underscore-dangle
        const index = this.notes.findIndex((note) => note._id === id);
        this.notes[index] = {date: new Date(newDate), crdate: new Date(crdate), ...rest};
        this.onNotesUpdated();
    }

    async deleteNote(id) {
        await httpService.get('DELETE', `/api/notes/${id}`);

        // eslint-disable-next-line no-underscore-dangle
        const index = this.notes.findIndex((note) => note._id === id);
        this.notes.splice(index, 1);
        this.onNotesUpdated();
    }

    async toggleNote(id) {
        const {completed} = await this.getNote(id);
        const response = await httpService.get('PATCH', `/api/notes/${id}`, {
            completed: !completed,
        });

        const {date: newDate, crdate, ...rest} = response;
        // eslint-disable-next-line no-underscore-dangle
        const index = this.notes.findIndex((note) => note._id === id);
        this.notes[index] = {date: new Date(newDate), crdate: new Date(crdate), ...rest};
        this.onNotesUpdated();
    }
}

export default NoteModel;
