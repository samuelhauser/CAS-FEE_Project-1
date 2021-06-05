import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Get all notes',
    });
});

router.post('/', (req, res) => {
    res.status(200).json({
        message: 'Adding new note',
    });
});

router.get('/:id', (req, res) => {
    res.status(200).json({
        message: `Get details for note with id ${req.params.id}`,
    });
});

router.put('/:id', (req, res) => {
    res.status(200).json({
        message: `Update note with id ${req.params.id}`,
    });
});

router.delete('/:id', (req, res) => {
    res.status(200).json({
        message: `Delete note with id ${req.params.id}`,
    });
});

export default router;
