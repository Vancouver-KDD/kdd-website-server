var express = require('express');
var router = express.Router();

var userController = require('../http/controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Example collection */
router.route('/users').post(userController.createUser)
                    .get(userController.listUser);

module.exports = router;
