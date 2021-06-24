export default class Note {
    constructor(title, description, date, importance = 0, completed = false) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.importance = importance;
        this.completed = completed;
        this.createdAt = new Date();
    }
}
