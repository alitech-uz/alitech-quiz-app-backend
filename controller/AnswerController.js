const AnswerModel = require('../model/AnswerModel');
const QuestionModel = require('../model/QuestionModel');
/**
 * AnswerController.js
 *
 * @description :: Server-side logic for managing Questions.
 */


exports.list = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const questions = await AnswerModel.paginate({}, {
        page,
        limit: pageSize,
    });
    return res.status(200).json({ success: true, payload: questions })
}

exports.result = async (req, res) => {
    const { id } = req.params;
    // const answer = await AnswerModel.findById(_id).populate([{
    //     path: "questions.question",
    //     model: "Question"
    // }]);
    const answerAggregation = await AnswerModel.findById(id).populate([{
        path: "questions.question",
        model: "Question"
    }]);
    const wrongAnswer = []
    const correctAnswers = []
    const result = answerAggregation.questions.map(question => {
        const { _id, options, choosenAnswer } = question
        let isCorrect;
        const resultObject = {
            _id,
            options
        }
        if (!choosenAnswer) {
            resultObject.isCorrect = false
            return resultObject
        };
        options.some(option => {
            return option.isCorrect && _id === choosenAnswer
        })
        return {

        }
    })
    console.log(answerAggregation, "answerAggregation");
    return res.status(200).json({ success: true, payload: answerAggregation })
}
exports.show = async (req, res) => {
    const { id } = req.params

    const question = await AnswerModel.findOne(id);
    return res.status(200).json({ success: true, payload: question })
}
exports.create = async (req, res) => {
    const user = req.locals.user._id;
    let questions = await QuestionModel.aggregate([{ $sample: { size: 2 } }])
    questions = questions.map(({ _id }) => {
        return { question: _id }
    })
    const generatedAnswer = await AnswerModel.create({ user, questions });
    const populatedAnswer = await AnswerModel.findById(generatedAnswer._id).populate([{ path: 'questions.question', model: "Question", select: "-options.isCorrect" }]).exec();
    return res.status(200).json({ success: true, payload: populatedAnswer })
}
exports.update = async (req, res) => {
    const { id: _id } = req.params
    const user = req.locals.user._id
    const { question, option } = req.body
    const answer = await AnswerModel.findOneAndUpdate({
        _id,
        user,
        'questions.question': question
    }, {
        $set: {
            'questions.$.choosenAnswer': option,
        },
    }, { new: true });
    return res.status(200).json({ success: true, payload: answer })
}
exports.remove = async (req, res) => {
    const { id } = req.params
    const question = await AnswerModel.findOneAndRemove(id);
    return res.status(200).json({ success: true, payload: question })
}