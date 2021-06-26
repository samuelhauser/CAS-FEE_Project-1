import Model from '../models/note-model.js';
import View from '../views/note-view.js';

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.bindNotesUpdated(this.onNoteListChanged.bind(this));
        this.model.loadData();

        this.view.bindSorting(this.handleSorting.bind(this));
        this.view.bindCompleted(this.handleCompleted.bind(this));
        this.view.bindNewNoteFormSubmit(this.handleNewNoteFormSubmit.bind(this));
        this.view.bindNoteFormSubmit(this.handleNoteFormSubmit.bind(this));
        this.view.bindEditNote(this.handleEditNote.bind(this));
        this.view.bindDeleteNote(this.handleDeleteNote.bind(this));
        this.view.bindToggleNote(this.handleToggleNote.bind(this));
        this.view.bindCancelModal();
        this.view.switchCompleted(this.model.completed);

        this.onNoteListChanged();
    }

    onNoteListChanged() {
        this.view.displayNotes(this.model.sortedAndFilteredNotes, this.model.sorting === 'title');
        this.view.displayNumbers(this.model.notes);
        this.view.switchSorting(this.model.sorting);
    }

    handleSorting(sorting) {
        this.model.switchSorting(sorting);
    }

    handleCompleted(completed) {
        this.model.switchCompleted(completed);
    }

    handleNewNoteFormSubmit(data) {
        this.view.openFormModal(data);
    }

    async handleNoteFormSubmit(data) {
        if (typeof data.id === 'undefined') {
            await this.model.createNote(data);
        } else {
            await this.model.updateNote(data);
        }
    }

    async handleEditNote(id) {
        const {title, description, date, importance} = await this.model.getNote(id);
        this.view.openFormModal({note: id, title, description, date, importance});
    }

    async handleDeleteNote(id) {
        await this.model.deleteNote(id);
    }

    async handleToggleNote(id) {
        await this.model.toggleNote(id);
    }
}

export default new NoteController(new Model(), new View());
