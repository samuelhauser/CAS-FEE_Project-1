import ThemeModel from '../models/theme-model.js';
import ThemeView from '../views/theme-view.js';

class ThemeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.bindThemeChanged(this.onThemeChanged.bind(this));
        this.view.bindThemeSwitch(this.handleThemeSwitch.bind(this));

        this.onThemeChanged(this.model.theme);
    }

    onThemeChanged(theme) {
        this.view.switchTheme(theme);
    }

    handleThemeSwitch(theme) {
        this.model.switchTheme(theme);
    }
}

export default new ThemeController(new ThemeModel(), new ThemeView());
