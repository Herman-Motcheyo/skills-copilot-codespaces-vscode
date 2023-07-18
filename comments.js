
const express = require('express');
const app = express();
const fs = require('fs');

// use the express.static() middleware to serve static files
// in this case, serve all files in the public directory
app.use(express.static('public'));

// use the express.json() middleware to parse JSON data in the HTTP request body
app.use(express.json());

// use the express.urlencoded() middleware to parse URL-encoded data in the HTTP request body
app.use(express.urlencoded({ extended: true }));

// listen for HTTP requests on port 3000
app.listen(3000, () => console.log('listening on port 3000'));

// GET /comments
// return a list of all comments
app.get('/comments', (req, res) => {
  // read the contents of the comments.json file
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      // if there was an error reading the file, send an error response
      return res.status(500).json({ error: err.message });
    }
    // if there was no error reading the file, parse the JSON data
    const comments = JSON.parse(data);
    // send the parsed data as the response
    res.json(comments);
  });
});
