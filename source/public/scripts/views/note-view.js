import {isToday, isTomorrow, isAfterTomorrow, isBeforeToday, formatDate} from '../utils/date.js';

// eslint-disable-next-line no-undef
Handlebars.registerHelper('dateFormat', (context) => context.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}));
// eslint-disable-next-line no-undef
Handlebars.registerHelper('isCompleted', (context) => (context ? 'card-completed' : null));
// eslint-disable-next-line no-undef
Handlebars.registerHelper('loop-until', (context, options) => {
    let ret = '';
    for (let i = 0, j = context; i < j; i++) {
        ret += options.fn(context[i]);
    }
    return ret;
});
// eslint-disable-next-line no-undef
Handlebars.registerPartial('note-card', document.getElementById('note-card-partial').innerHTML);

class NoteView {
    constructor() {
        // eslint-disable-next-line no-undef
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);

        this.noteList = document.querySelector('.note-list');
        this.noteListEmptyMessage = this.noteList.querySelector('.empty-message').outerHTML;
        this.modal = document.querySelector('.modal');
        this.countTotal = document.getElementById('count-total');
        this.countCompleted = document.getElementById('count-completed');
        this.sortButtons = document.querySelectorAll('[data-sort]');
        this.completedButton = document.querySelector('[data-completed]');

        this.newNoteForm = document.newNoteForm;
        this.newNoteFormElements = {
            title: this.newNoteForm.title,
        };

        this.noteForm = document.noteForm;
        this.noteFormElements = {
            note: this.noteForm.note,
            title: this.noteForm.title,
            description: this.noteForm.description,
            date: this.noteForm.date,
            importance: this.noteForm.importance,
        };
    }

    displayNumbers(notes) {
        this.countTotal.value = notes.length;
        this.countCompleted.value = notes.filter((note) => note.completed).length;
    }

    displayNotes(notes, group) {
        document.body.classList.remove('empty-note-list');
        this.noteList.innerHTML = null;
        if (notes.length <= 0) {
            document.body.classList.add('empty-note-list');
            this.noteList.innerHTML = this.noteListEmptyMessage;
            return;
        }

        if (group) {
            const todayNotes = notes.filter((note) => isToday(note.date));
            if (todayNotes.length > 0) {
                this.noteList.insertAdjacentHTML('beforeend', this.noteTemplateCompiled({
                    title: 'Today',
                    items: todayNotes,
                }));
            }

            const tomorrowNotes = notes.filter((note) => isTomorrow(note.date));
            if (tomorrowNotes.length > 0) {
                this.noteList.insertAdjacentHTML('beforeend', this.noteTemplateCompiled({
                    title: 'Tomorrow',
                    items: tomorrowNotes,
                }));
            }

            const futureNotes = notes.filter((note) => isAfterTomorrow(note.date));
            if (futureNotes.length > 0) {
                this.noteList.insertAdjacentHTML('beforeend', this.noteTemplateCompiled({
                    title: 'Future',
                    items: futureNotes,
                }));
            }

            const oldNotes = notes.filter((note) => isBeforeToday(note.date));
            if (oldNotes.length > 0) {
                this.noteList.insertAdjacentHTML('beforeend', this.noteTemplateCompiled({
                    title: 'Older',
                    items: oldNotes,
                }));
            }
        } else {
            this.noteList.insertAdjacentHTML('beforeend', this.noteTemplateCompiled({
                items: notes,
            }));
        }
    }

    switchSorting(sorting) {
        this.sortButtons.forEach((button) => {
            if (button.dataset.sort === sorting) {
                button.classList.add('btn-active');
            } else {
                button.classList.remove('btn-active');
            }
        });
    }

    switchCompleted(completed) {
        this.completedButton.checked = completed;
    }

    bindSorting(handler) {
        this.sortButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const {sort} = event.target.dataset;
                handler(sort);
            });
        });
    }

    bindCompleted(handler) {
        this.completedButton.addEventListener('input', (event) => {
            handler(event.target.checked);
        });
    }

    bindNewNoteFormSubmit(handler) {
        this.newNoteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            handler({title: this.newNoteFormElements.title.value});
            this.newNoteFormElements.title.value = null;
        });
    }

    bindNoteFormSubmit(handler) {
        this.noteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const {note, title, description, date, importance} = this.noteFormElements;
            const dataObj = {
                ...(note.value ? {id: note.value} : null),
                ...(title.value ? {title: title.value} : null),
                ...(description.value ? {description: description.value} : null),
                ...(date.value ? {date: new Date(date.value)} : null),
                ...(importance.value ? {importance: +importance.value} : null),
            };
            handler(dataObj);
            this.closeFormModal();
        });
    }

    bindEditNote(handler) {
        this.noteList.addEventListener('click', (event) => {
            if (event.target.closest('[data-edit-note]')) {
                const id = event.target.closest('[data-edit-note]').dataset.editNote;
                handler(id);
            }
        });
    }

    bindDeleteNote(handler) {
        this.noteList.addEventListener('click', (event) => {
            if (event.target.closest('[data-delete-note]')) {
                const id = event.target.closest('[data-delete-note]').dataset.deleteNote;
                handler(id);
            }
        });
    }

    bindToggleNote(handler) {
        this.noteList.addEventListener('click', (event) => {
            if (event.target.closest('[data-toggle-note]')) {
                const id = event.target.closest('[data-toggle-note]').dataset.toggleNote;
                handler(id);
            }
        });
    }

    bindCancelModal() {
        this.modal.querySelector('[data-modal-close]').addEventListener('click', (event) => {
            event.preventDefault();
            this.closeFormModal();
        });
    }

    handleEscapeEvent(event) {
        if (event.key === 'Escape') {
            this.closeFormModal();
        }
    }

    openFormModal({note, title, description, date, importance}) {
        this.noteFormElements.note.value = note || null;
        this.noteFormElements.title.value = title || null;
        this.noteFormElements.description.value = description || null;
        this.noteFormElements.date.value = date ? formatDate(date) : null;
        this.noteFormElements.importance.value = importance || null;
        this.modal.classList.add('modal-active');

        setTimeout(() => {
            if (!this.noteFormElements.description.value) {
                this.noteFormElements.description.focus();
            } else {
                this.noteFormElements.title.focus();
            }
        }, 100);

        document.addEventListener('keydown', this.handleEscapeEvent.bind(this));
    }

    closeFormModal() {
        this.noteForm.reset();
        this.modal.classList.remove('modal-active');

        document.removeEventListener('keydown', this.handleEscapeEvent.bind(this));
    }
}

export default NoteView;
