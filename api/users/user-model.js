// user-model
const db = require('../../data/db-config');

module.exports = {
     find,
     findById,
     findPosts,
     add,
     update,
     remove
}

function find() {
    return db('users')
}

function findById(id) {
     return db('users').where({id}).first();
}


function findPosts(user_id) {
     return db('posts')
          .where({user_id})
          .join('users', 'posts.user_id', '=', 'users.id')
          .select('posts.id', 'users.username', 'posts.contents') 
}


function add(userData) {
     return db("users")
     .insert(userData)
     .then(ids => findById(ids[0]))
}


function update(id, changes) {
     return db("users")
    .where({ id })
    .update(changes)
    .then(count => findById(id))
}


function remove() {
   return db("users")
   .where({ id })
   .del()  
}


