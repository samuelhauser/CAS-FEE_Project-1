import express from 'express';
import * as notesController from '../controller/notesController.js';

const router = express.Router();

router.get('/', notesController.allNotes);
router.post('/', notesController.createNote);
router.get('/:id', notesController.getNote);
router.patch('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

export default router;
