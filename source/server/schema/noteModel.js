export default class Note {
    constructor(title, description, date, importance = 0) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.importance = importance;
        this.finished = false;
        this.createdAt = new Date();
    }
}
