const db = require("../../data/db-config.js");

// user-model
module.exports = {
  getUserPosts() {
    // select
    //   p.id,
    //   u.username,
    //   p.contents
    // from users u
    // join posts p
    //   on p.user_id = u.id
    // where u.id = 1;
    return db('users u')
      .join('posts p', 'p.user_id', 'u.id')
      .select('p.id', 'u.username', 'p.contents')
      .where('u.id', id)
  }
}
