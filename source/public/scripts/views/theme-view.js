class ThemeView {
    constructor() {
        this.themeElement = document.body;
        this.themeSwitcher = document.querySelectorAll('[data-theme]');
    }

    switchTheme(theme) {
        const classListArray = [...this.themeElement.classList];
        this.themeElement.classList.remove(...classListArray.filter((className) => className.startsWith('theme-')));
        if (theme !== 'default') {
            this.themeElement.classList.add(`theme-${theme}`);
        }
        document.querySelectorAll('.active[data-theme]').forEach((element) => {
            element.classList.remove('active');
        });
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    }

    bindThemeSwitch(handler) {
        this.themeSwitcher.forEach((el) => {
            el.addEventListener('click', (event) => {
                event.preventDefault();
                const {theme} = event.target.dataset;
                handler(theme);
            });
        });
    }
}

export default ThemeView;
