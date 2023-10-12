const express = require('express');
const router = express.Router();
const AnswerController = require('../controller/AnswerController.js');

/*
 * GET
 */
router.get('/', AnswerController.list);

/*
 * GET
 */
router.get('/:id/result', AnswerController.result);

/*
 * GET
//  */
// router.get('/:id', AnswerController.show);

/*
 * POST
 */
router.post('/generate', AnswerController.create);

/*
 * PUT
 */
router.put('/:id', AnswerController.update);

// /*
//  * DELETE
//  */
// router.delete('/:id', AnswerController.remove);

module.exports = router;
