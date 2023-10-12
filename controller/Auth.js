const Users = require("../model/UserModel");
const Joi = require("joi");
const { createToken } = require("../utils");


exports.signUp = async (req, res) => {
  const { error } = validateSignUp(req.body);
  if (error)
    return res.status(400).json({ success: false, msg: error.message });
  const user = await Users.create(req.body);
  const token = createToken({ _id: user._id, isAdmin: user.isAdmin });

  const { password, ...docs } = user._doc;
  res.status(201).json({ token, user: docs, success: true });
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const { error } = validateLogin(req.body);
  if (error)
    return res.status(400).json({ success: false, msg: error.message });
  const user = await Users.findOne({ phone });
  if (!user)
    return res
      .status(422)
      .json({ success: false, msg: "Phone or password is incorrect" });

  const isSamePassword = await user.validatePassword(password);

  if (!isSamePassword) {
    return res.status(422).json({ success: false, msg: "Phone or password is incorrect" });
  }
  const token = createToken({ _id: user._id, isAdmin: user.isAdmin });
  const { password: exeptionPass, ...docs } = user._doc;
  return res.status(200).json({ token, user: docs, success: true });
};

function validateLogin(formData) {
  const orderSchema = Joi.object({
    phone: Joi.string().required().regex(/^\+?\d{9,12}$/),
    password: Joi.string().required(),
  });

  return orderSchema.validate(formData, { abortEarly: false });
}
function validateSignUp(formData) {
  const orderSchema = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string().required().regex(/^\+?\d{9,12}$/),
    password: Joi.string().required().min(6),
    isAdmin: Joi.boolean(),
    dob: Joi.date(),
  });

  return orderSchema.validate(formData, { abortEarly: false });
}