class ThemeModel {
    constructor() {
        this.storageKey = 'note-theme';
    }

    get theme() {
        return localStorage.getItem(this.storageKey) || 'default';
    }

    set theme(value) {
        localStorage.setItem(this.storageKey, value);
    }

    bindThemeChanged(callback) {
        this.onThemeChanged = callback;
    }

    switchTheme(theme) {
        this.onThemeChanged(theme);
        this.theme = theme;
    }
}

export default ThemeModel;
