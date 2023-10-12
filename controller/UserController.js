const UserModel = require('../model/AnswerModel');
/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */


exports.list = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const questions = await UserModel.paginate({}, {
        page,
        limit: pageSize,
    });
    return res.status(200).json({ success: true, payload: questions })
}
exports.show = async (req, res) => {
    const {id} = req.params

    const question = await UserModel.findOne(id);
    return res.status(200).json({ success: true, payload: question })
}
exports.create = async (req, res) => {
    const question = await UserModel.create(req.body);
    return res.status(200).json({ success: true, payload: question })
}
exports.update = async (req, res) => {
    const {id} = req.params
    const question = await UserModel.findOneAndUpdate(id,req.body);
    return res.status(200).json({ success: true, payload: question })
}
exports.remove = async (req, res) => {
    const {id} = req.params
    const question = await UserModel.findOneAndRemove(id);
    return res.status(200).json({ success: true, payload: question })
}