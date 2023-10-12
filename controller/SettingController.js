const SettingModel = require('../model/AnswerModel');
/**
 * Settingontroller.js
 *
 * @description :: Server-side logic for managing Settings.
 */


exports.list = async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const questions = await SettingModel.paginate({}, {
        page,
        limit: pageSize,
    });
    return res.status(200).json({ success: true, payload: questions })
}
exports.show = async (req, res) => {
    const {id} = req.params

    const question = await SettingModel.findOne(id);
    return res.status(200).json({ success: true, payload: question })
}
exports.create = async (req, res) => {
    const question = await SettingModel.create(req.body);
    return res.status(200).json({ success: true, payload: question })
}
exports.update = async (req, res) => {
    const {id} = req.params
    const question = await SettingModel.findOneAndUpdate(id,req.body);
    return res.status(200).json({ success: true, payload: question })
}
exports.remove = async (req, res) => {
    const {id} = req.params
    const question = await SettingModel.findOneAndRemove(id);
    return res.status(200).json({ success: true, payload: question })
}