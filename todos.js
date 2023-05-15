const express = require('express');
const router = express.Router();
const cors = require('cors')
router.use(express.json());
router.use(cors({
    origin: "*",
}))

let todos = [
    {
        id: 1,
        title: 'todo1',
        description: 'todo1 description',
        completed: false
    },
    {
        id: 2,
        title: 'todo2',
        description: 'todo2 des',
        completed: false
    },
    {
        id: 3,
        title: 'todo3',
        description: 'todo3 des',
        completed: true
    }

];

router.get('/:id', (req, res) => {
    const id = +req.params.id;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});
router.get('/', (req, res) => {
    res.status(200).json(todos);
});





router.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});


router.post('/:id', validateTask, (req, res) => {
    const id = +req.params.id;
    const { title, description, completed } = req.body;
    const newTodo = {
        id,
        title,
        description,
        completed
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


router.put('/:id', validateTask, (req, res) => {
    const id = +req.params.id;
    const { title, description, completed } = req.body;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index].title = title;
        todos[index].description = description;
        todos[index].completed = completed;
        res.status(200).json(todos[index]);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});


function validateTask(req, res, next) {
    const { title, description, completed } = req.body;
    if (!title || !description || completed === undefined) {
        res.status(400).json({ error: 'Title, description, and completed fields are required' });
    } else {
        next();
    }
}

module.exports = router;




