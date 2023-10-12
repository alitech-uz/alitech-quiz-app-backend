const express = require('express');
const router = express.Router();
const QuestionController = require('../controller/QuestionController.js');
const { validateCreateQuestion, validateUpdateQuestion, validateUpdateOption, validateUpdateOptions } = require('../dto/QuestionsDto.js');

/*
 * GET
 */
router.get('/', QuestionController.list);

/*
 * GET
 */
router.get('/:id', QuestionController.show);

// /*
//  * POST
//  */
router.post('/', validateCreateQuestion, QuestionController.create);

// /*
//  * PUT
//  */
router.put('/:id', validateUpdateQuestion, QuestionController.updateQuestion);

// /*
//  * PUT
//  */
router.put('/:id/:option', validateUpdateOption, QuestionController.updateQuestionOption);

// /*
//  * PUT
//  */
router.put('/:id/update/options', validateUpdateOptions, QuestionController.updateQuestionOptions);

// /*
//  * DELETE
//  */
router.delete('/:id', QuestionController.remove);

module.exports = router;
