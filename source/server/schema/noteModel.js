export default class Note {
    constructor({title, description, date, importance = 0, completed = false}) {
        this.title = title;
        this.description = description;
        this.date = date ? new Date(date) : null;
        this.importance = importance;
        this.completed = completed;
        this.crdate = new Date();
    }
}
