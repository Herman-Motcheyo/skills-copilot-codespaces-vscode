// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create our express app
const app = express();

// Use cors middleware
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());

// Create an object to store comments
const commentsByPostId = {};

// Create a route for getting comments
app.get('/posts/:id/comments', (req, res) => {
  // Return comments for post id
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a route for posting a comment
app.post('/posts/:id/comments', (req, res) => {
  // Create a random id for comment
  const commentId = randomBytes(4).toString('hex');
  // Get the comment content from request body
  const { content } = req.body;
  // Get the post id from request params
  const postId = req.params.id;
  // Get the comments for the post id
  const comments = commentsByPostId[postId] || [];
  // Add the new comment to the comments
  comments.push({ id: commentId, content, status: 'pending' });
  // Add the comments to the comments for the post id
  commentsByPostId[postId] = comments;
  // Return the comments
  res.status(201).send(comments);
});

// Create a route for posting an event
app.post('/events', (req, res) => {
  // Get the event type from request body
  const { type } = req.body;
  // Check if event type is comment created
  if (type === 'CommentCreated') {
    // Get the event data from request body
    const { id, content, postId } = req.body.data;
    // Get the comments for the post id
    const comments = commentsByPostId[postId] || [];
    // Add the new comment to the comments
    comments.push({ id, content, status: 'pending' });
    // Add the comments to the comments for the post id
    commentsByPostId[postId] = comments;
  }
  // Check if event type is comment moderated
  if (type === 'CommentModerated') {
    // Get the event data from request body
    const { id, postId, status, content }