import ThemeController from './controllers/theme-controller.js';

class App {
    constructor() {
        this.theme = ThemeController;

        this.today = document.getElementById('date-today');
        this.displayTodayDate();
    }

    displayTodayDate() {
        const today = new Date();
        this.today.innerText = today.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    }
}

// eslint-disable-next-line no-unused-vars
const app = new App();
