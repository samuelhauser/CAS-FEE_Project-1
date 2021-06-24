import {sortItemsBy} from '../utils/sorting.js';

class NoteModel {
    constructor() {
        this.sortingStorageKey = 'note-sorting';
        this.completedStorageKey = 'note-completed';

        this.notesData = [
            {
                id: 1,
                title: 'My very first note',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-21 14:00:00'),
                importance: 2,
                completed: false,
                crdate: new Date('2021-06-21 10:00:00'),
            },
            {
                id: 2,
                title: 'My second note',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-21 12:00:00'),
                importance: 3,
                completed: true,
                crdate: new Date('2021-06-21 12:00:00'),
            },
            {
                id: 3,
                title: 'My third note',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-22'),
                importance: 1,
                completed: false,
                crdate: new Date('2021-06-22 12:00:00'),
            },
            {
                id: 4,
                title: 'Lorem ipsum dolor',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-23'),
                importance: 1,
                completed: false,
                crdate: new Date('2021-06-23 12:00:00'),
            },
            {
                id: 5,
                title: 'Lorem ipsum dolor',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-20'),
                importance: 1,
                completed: false,
                crdate: new Date('2021-06-20 12:00:00'),
            },
            {
                id: 6,
                title: 'Lorem ipsum dolor',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-19'),
                importance: 0,
                completed: true,
                crdate: new Date('2021-06-19 12:00:00'),
            },
            {
                id: 7,
                title: 'Lorem ipsum dolor',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-28'),
                importance: 1,
                completed: false,
                crdate: new Date('2021-06-28 12:00:00'),
            },
            {
                id: 8,
                title: 'Lorem ipsum dolor',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                date: new Date('2021-06-24'),
                importance: 1,
                completed: false,
                crdate: new Date('2021-06-24 12:00:00'),
            },
        ];
    }

    get notes() {
        return this.notesData;
    }

    get sortedAndFilteredNotes() {
        let filteredNodes = this.notes;
        if (!this.completed) {
            filteredNodes = filteredNodes.filter((note) => note.completed === false);
        }
        filteredNodes = sortItemsBy(filteredNodes, this.sorting);
        return filteredNodes;
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

    getNote(id) {
        return this.notes.find((note) => note.id === id);
    }

    createNote(title, description, date, importance) {
        console.log('create', {title, description, date: new Date(date), importance: +importance});
    }

    updateNote(id, title, description, date, importance) {
        console.log('update', id, {title, description, date: new Date(date), importance: +importance});
    }

    deleteNote(id) {
        console.log('delete', id);
    }

    toggleNote(id) {
        console.log('toggle', id);
    }
}

export default NoteModel;
