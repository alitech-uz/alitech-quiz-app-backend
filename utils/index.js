const jwt = require("jsonwebtoken");
const SECRET_KEY = 'ThisIsASecretKey'
const Users = require("../model/UserModel");
const CustomError = require("./CustomError");
exports.createToken = ({ _id, isAdmin }) => {
  return jwt.sign({ _id, isAdmin }, SECRET_KEY, { expiresIn: "10h" });
};

exports.validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new CustomError(error, 401)
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const validToken = token ? this.validateToken(token) : false;

    if (!validToken) return res
      .status(401)
      .json({ success: false, msg: "You are not authenticated" });
    const user = await Users.findById(validToken._id);
    if (!user) return res
      .status(401)
      .json({ success: false, msg: "You are not authenticated" });
    req.session.user = user
    req.locals = { ...req.locals, user };
    next();
  } catch (error) {
    next(error)
  }
};

exports.isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const validToken = token ? this.validateToken(token) : false;
  if (!validToken) return res
    .status(401)
    .json({ success: false, msg: "You are not authenticated" });

  const admin = await Users.findById(validToken._id);
  if (!admin) return res
    .status(401)
    .json({ success: false, msg: "You are not authenticated" });

  if (!admin.isAdmin) return res
    .status(403)
    .json({ success: false, error: "You are not authorized" });
  req.session.user = admin
  req.locals = { ...req.locals, user: admin };
  next();
};
