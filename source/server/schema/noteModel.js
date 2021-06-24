export default class Note {
    constructor(title, description, date, importance = 0, completed = false) {
        this.title = title;
        this.description = description;
        this.date = new Date(date);
        this.importance = importance;
        this.completed = completed;
        this.crdate = new Date();
    }
}
