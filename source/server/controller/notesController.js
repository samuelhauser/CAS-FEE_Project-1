import {noteStore} from '../services/noteStore.js';

export const allNotes = async (req, res) => {
    res.status(200).json((await noteStore.all()));
};

export const getNote = async (req, res) => {
    res.status(200).json((await noteStore.get(req.params.id)));
};

export const createNote = async (req, res) => {
    res.status(200).json((await noteStore.create(
        req.body.title,
        req.body.description,
        req.body.date,
        req.body.importance,
    )));
};

export const updateNote = async (req, res) => {
    res.status(200).json((await noteStore.update(req.params.id, {
        title: req.body.title || null,
        description: req.body.description || null,
        date: req.body.date || null,
        importance: req.body.importance || null,
        completed: typeof req.body.completed !== 'undefined' ? req.body.completed : null,
    })));
};

export const deleteNote = async (req, res) => {
    res.status(200).json((await noteStore.delete(req.params.id)));
};
