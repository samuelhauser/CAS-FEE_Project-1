import {noteStore} from '../services/noteStore.js';

export const allNotes = async (req, res) => {
    res.status(200).json((await noteStore.all()));
};

export const getNote = async (req, res) => {
    res.status(200).json((await noteStore.get(req.params.id)));
};

export const createNote = async (req, res) => {
    const dataObj = {
        ...(typeof req.body.title === 'undefined' ? null : {title: req.body.title}),
        ...(typeof req.body.description === 'undefined' ? null : {description: req.body.description}),
        ...(typeof req.body.date === 'undefined' ? null : {date: new Date(req.body.date)}),
        ...(typeof req.body.importance === 'undefined' ? null : {importance: req.body.importance}),
    };

    res.status(200).json(await noteStore.create(dataObj));
};

export const updateNote = async (req, res) => {
    const dataObj = {
        ...(typeof req.body.title === 'undefined' ? null : {title: req.body.title}),
        ...(typeof req.body.description === 'undefined' ? null : {description: req.body.description}),
        ...(typeof req.body.date === 'undefined' ? null : {date: new Date(req.body.date)}),
        ...(typeof req.body.importance === 'undefined' ? null : {importance: req.body.importance}),
        ...(typeof req.body.completed === 'undefined' ? null : {completed: req.body.completed}),
    };

    res.status(200).json(await noteStore.update(req.params.id, dataObj));
};

export const deleteNote = async (req, res) => {
    res.status(200).json((await noteStore.delete(req.params.id)));
};
