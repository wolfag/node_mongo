var express = require ('express');
var router = express.Router ();

/* GET home page. */
router.get ('/', function (req, res, next) {
  res.render ('index', {title: 'Express'});
});

/* GET hello World page. */
router.get ('/helloworld', (req, res) => {
  res.render ('helloworld', {title: 'Hello, World!'});
});

/* GET userlist page. */
router.get ('/userlist', (req, res) => {
  const db = req.db;
  const collection = db.get ('userCollection');
  collection.find ({}, {}, (e, docs) => {
    res.render ('userlist', {userlist: docs});
  });
});

/* GET New User page. */
router.get ('/newuser', (req, res) => {
  res.render ('newuser', {title: 'Add New User'});
});

/* POST to Add User Service */
router.post ('/adduser', (req, res) => {
  const db = req.db;
  const {username, useremail: email} = req.body;
  const collection = db.get ('userCollection');

  collection.insert ({username, email}, (err, doc) => {
    if (err) {
      res.send ('There was a problem adding the information to the database.');
    } else {
      res.redirect ('userlist');
    }
  });
});

module.exports = router;
