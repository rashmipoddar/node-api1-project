// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
const port = 5000;

server.use(express.json());

server.post('/api/users', (req, res) => {
  const user = req.body;
  console.log(user);
  
  if (!req.body.name || !req.body.bio) {
    res.status(400).send({errorMessage: 'Please provide name and bio for the user.'})
  } else {
    db.insert(user) 
    .then(response => {
      console.log(response);
      res.status(201).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({error : 'There was an error while saving the user to the database'});
    })
  }
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      // console.log(users);
      res.status(200).send(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({error: 'The users information could not be retrieved.'});
    })
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id);

  db.findById(id)
    .then(user => {
      console.log(user);
      if (user === undefined) {
        res.status(404).send({message: 'The user with the specified ID does not exist.'});
      } else {
        res.status(200).send(user);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The user information could not be retrieved.'});
    })
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  db.remove(id) 
    .then(response => {
      console.log(response);
      if (response === 0) {
        res.status(404).send({message: 'The user with the specified ID does not exist.'});
      } else {
        res.status(200).send('User deleted');
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({error: 'The user could not be removed'});
    }) 
})













server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});