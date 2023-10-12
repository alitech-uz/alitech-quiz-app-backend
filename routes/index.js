const express = require('express');
const router = express.Router();
const AuthRouter = require("./AuthRoutes")
const UserRouter = require("./UserRoutes")
const QuestionRouter = require("./QuestionRoutes");
const AnswerRouter = require("./AnswerRoutes");
const SettingRouter = require("./SettingRoutes");
const { currentUser, isAdmin } = require('../utils');
/* GET home page. */
router.use("/auth", AuthRouter);
router.use("/user", isAdmin, UserRouter);
router.use("/question", isAdmin, QuestionRouter);
router.use("/answer", currentUser, AnswerRouter);
router.use("/setting", isAdmin, SettingRouter);


module.exports = router;
