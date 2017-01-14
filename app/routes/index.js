var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/a', function(req, res, next) {
  res.send('respond with a resource');
  res.end();
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('index',{ title : 'Polls'});
// });

module.exports = router;
