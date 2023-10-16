const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


let tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3' },
  { id: 4, title: 'Task 4', description: 'Description for Task 4' },
  { id: 5, title: 'Task 5', description: 'Description for Task 5' },
  { id: 6, title: 'Task 6', description: 'Description for Task 6' },
  { id: 7, title: 'Task 7', description: 'Description for Task 7' },
  { id: 8, title: 'Task 8', description: 'Description for Task 8' },

];
let nextTaskId = 2;



app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});


app.post('/create-tasks', (req, res) => {
  const task = {
    id: nextTaskId,
    title: req.body.title,
    description: req.body.description,
  };
  nextTaskId++;
  tasks.push(task);
  res.status(201).json(task);
});


app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].title = req.body.title;
    tasks[taskIndex].description = req.body.description;
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});


app.delete('/delete-tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).send();
});
