var express = require('express');
var router = express.Router();
const {columns} = require('../mock')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(columns);
});

module.exports = router;
