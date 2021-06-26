# CAS-FEE Project-1

Projekt 1 vom CAS FEE an der OST (2021-2022).

## NPM Befehle

Um das Projekt mit der korrekten Node Version auszuführen, als erstes `nvm use` ausführen.

| Befehl            | Beschreibung                                  |
| ----------------- | --------------------------------------------- |
| npm run stylelint | Testet ob die CSS Files in Ordnung sind.      |
| npm run w3c       | Testet ob die HTML Files in Ordnung sind.     |
| npm run eslint    | Testet ob die JS Files in Ordnung sind.       |
| npm run all       | Führt die Tests für CSS/HTML/JS aus.          |
| npm run start     | Started den Web-Server: http://localhost:3000 |

## REST API Endpoints

| URL                                  | Method | Beschreibung                    |
| ------------------------------------ | ------ | ------------------------------- |
| http://localhost:3000/api/notes      | GET    | Gibt alle Notizen zurück        |
| http://localhost:3000/api/notes      | POST   | Erstellt eine neue Notiz        |
| http://localhost:3000/api/notes/[id] | GET    | Gibt eine einzelne Notiz zurück |
| http://localhost:3000/api/notes/[id] | PATCH  | Updated eine einzelne Notiz     |
| http://localhost:3000/api/notes/[id] | DELETE | Löst eine einzelne Notiz        |