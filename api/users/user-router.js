const express = require("express");

const db = require("../../data/db-config.js");
const Users = require('./user-model')

const router = express.Router();

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      console.log(user)

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;

  Users.add(userData)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then(updatedUser => {
      if (updatedUser) {
        res.json({updated: updatedUser})
      } else {
        res.status(400).json({message: "could not find user with specified id"})
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

router.get("/:id/posts", (req, res) => {
  const {id} = req.params;

  // SELECT posts.id, users.username, posts.contents FROM posts 
  // JOIN users ON posts.user_id = users.id
  // WHERE posts.user_id = id

  // db('posts')
  Useres.findPosts(id)
  .then(posts => {
    res.json(posts)
  })
  .catch(err => {
    res.status(500).json({message: "Failed to get user"})
  })
})

module.exports = router;
