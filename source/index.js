import express from 'express';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

import noteRoutes from './api/routes/notes.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/notes', noteRoutes);

app.use(express.static(join(currentDir, '/public')));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening at http://localhost:${port}`);
});
