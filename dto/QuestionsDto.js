const Joi = require("joi");
const CustomError = require("../utils/CustomError");

exports.validateCreateQuestion = (req, res, next) => {
  const { setting: { minQuestionOptions = 0 } = {} } = req.locals

  const optionSchema = Joi.object({
    variant: Joi.string().required(),
    title: Joi.string().required(),
    isCorrect: Joi.boolean().required(),
  });

  const questionSchema = Joi.object({
    title: Joi.string().required(),
    options: Joi.array().min(minQuestionOptions || 2).items(optionSchema).required(),
  });

  const { error } = questionSchema.validate(req.body, { abortEarly: false })
  if (error) {
    throw new CustomError(error.message, 400)
  }
  next()
}
exports.validateUpdateQuestion = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) throw new CustomError("Please provide field!", 400);
  const questionSchema = Joi.object({
    title: Joi.string(),
    level: Joi.number()
  });

  const { error } = questionSchema.validate(req.body, { abortEarly: false })
  if (error) {
    throw new CustomError(error.message, 400)
  }
  next()
}
exports.validateUpdateOption = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) throw new CustomError("Please provide field!", 400);
  const optionSchema = Joi.object({
    variant: Joi.string(),
    title: Joi.string(),
    isCorrect: Joi.boolean(),
  });

  const { error } = optionSchema.validate(req.body, { abortEarly: false })
  if (error) {
    throw new CustomError(error.message, 400)
  }
  next()
}
exports.validateUpdateOptions = (req, res, next) => {
  const { length } = Object.keys(req.body);

  if (!length) throw new CustomError("Please provide field!", 400);
  const optionSchema = Joi.object({
    variant: Joi.string(),
    title: Joi.string(),
    isCorrect: Joi.boolean(),
  });
  const optionsSchema = Joi.object({
    options: Joi.array().items(optionSchema),
  });

  const { error } = optionsSchema.validate(req.body, { abortEarly: false })
  if (error) {
    throw new CustomError(error.message, 400)
  }
  next()
}