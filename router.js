const express = require('express');
const app = express();


const todosRouter = require('./todos');

app.use('/todos', todosRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
