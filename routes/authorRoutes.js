var express = require('express');
var router = express.Router();
var authorController = require('../controllers/authorController.js');

/*
 * GET
 */
router.get('/', authorController.list);

/*
 * GET
 */
router.get('/:id', authorController.show);

/*
 * POST
 */
router.post('/', authorController.create);

/*
 * PUT
 */
router.put('/:id', authorController.update);

/*
 * DELETE
 */
router.delete('/:id', authorController.remove);

module.exports = router;
