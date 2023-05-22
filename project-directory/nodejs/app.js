const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a simple model
const Book = mongoose.model('Book', { title: String });


// Define a route to create a book
app.get('/books/create', async (req, res) => {
  try {
    const book = new Book({ title: 'Sample Book' });
    await book.save();
    res.send('Book created successfully');
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).send('Error creating book');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
