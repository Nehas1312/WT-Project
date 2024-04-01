require('dotenv').config()


let express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
let app = express();
const expressAsyncErrors = require('express-async-errors');
const Data = require('./mongoose')
const PORT =process.env.PORT
// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Serve static files from the React app
app.use(express.static('build'));


app.get('/api/tasks', (request, response) => {
  // console.log("get ochidni")
    Data.find({}).then(person =>
      {
          response.json(person)
      })
  });


// Post (send) data to MongoDB cluster
app.post('/api/tasks', async (req, res) => {
    try {
       // const newData = new Data(req.body); // Create a new document
       const newData = req.body
       const taskNew = new Data(
       {
          tname : newData.tname,
          date :newData.date,
          taccomplished: newData.taccomplished
        }
       )
       taskNew.save().then(savedinfo=>{
        res.json(savedinfo)
       }); 
    } catch (error) {
        console.error('Error submitting data to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = req.body;

    const updatedDocument = await Data.findByIdAndUpdate(
      taskId,
      updatedTask,
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedDocument);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Data.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(deletedTask);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(PORT, (err) => {
    if (err) console.log(`Server not connected: ${err}`);
    else console.log(`Server is connected on ${PORT}`);
});
