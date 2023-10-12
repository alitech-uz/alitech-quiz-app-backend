const QuestionModel = require('../model/QuestionModel.js');
const CustomError = require('../utils/CustomError.js');

/**
 * QuestionController.js
 *
 * @description :: Server-side logic for managing Questions.
 */


exports.list = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const questions = await QuestionModel.paginate({}, {
        page,
        limit: pageSize,
    });
    return res.status(200).json({ success: true, payload: questions })
}
exports.show = async (req, res) => {
    const { id } = req.params

    const question = await QuestionModel.findOne(id);
    return res.status(200).json({ success: true, payload: question })
}
exports.create = async (req, res) => {
    const question = await QuestionModel.create(req.body);
    return res.status(200).json({ success: true, payload: question })
}
exports.updateQuestion = async (req, res) => {
    const { id: _id } = req.params
    const question = await QuestionModel.findOneAndUpdate({ _id }, req.body, { new: true });
    if (!question) throw new CustomError("question not found", 400)
    return res.status(200).json({ success: true, payload: question })
}
exports.updateQuestionOptions = async (req, res) => {
    const { id: _id, options } = req.params
    const updatedQuestion = await QuestionModel.findOneAndUpdate({ _id }, { $set: { options } }, { new: true })
    if (!updatedQuestion) throw new CustomError("question not found", 400)
    return res.status(200).json({ success: true, payload: updatedQuestion })
}
exports.updateQuestionOption = async (req, res) => {
    const { id: _id, option } = req.params
    const updatedQuestion = await QuestionModel.findOneAndUpdate(
        {
            _id, // Convert questionId to ObjectId
            'options._id': option, // Convert optionIdToUpdate to ObjectId
        },
        {
            $set: {
                'options.$.variant': req.body.variant,
                'options.$.title': req.body.title,
                'options.$.isCorrect': req.body.isCorrect,
            },
        },
        { new: true } // Return the updated document
    );
    if (!updatedQuestion) throw new CustomError("options not found", 400)

    return res.status(200).json({ success: true, payload: updatedQuestion })
}
exports.remove = async (req, res) => {
    const { id } = req.params
    const question = await QuestionModel.findByIdAndRemove(id);
    if (!question) throw new CustomError("question not found", 404)
    return res.status(200).json({ success: true, payload: question })
}