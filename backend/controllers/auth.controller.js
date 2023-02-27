/* eslint-disable camelcase */
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const catchAsync = require("../global/catchAsync");

const { User, validate } = require("../models/user");
const functions = require("../global/functions");
const { OBJECT, ARRAY, USER } = functions.defaultData;
const { successVars, failureVars } = functions;
const _ = require("lodash");

const getToken = (user) => {
  const token = user.generateAuthToken();

  let responseToSend = _.pick(user, ["_id", "name", "email"]);
  responseToSend.token = token;
  return responseToSend;
};
const login = catchAsync(async (req, res) => {
  const { error } = validate(req.body, false);
  let MSG_KEY, STATUS;

  if (error) {
    ({ MSG_KEY, STATUS } = failureVars(""));

    return res
      .status(httpStatus.BAD_REQUEST)
      .send(functions.getResponse(STATUS, error.details[0].message, OBJECT));
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    ({ MSG_KEY, STATUS } = failureVars("EMAIL_ERROR"));

    return res
      .status(httpStatus.NOT_FOUND)
      .send(functions.getResponse(STATUS, MSG_KEY, OBJECT));
  }

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    ({ MSG_KEY, STATUS } = failureVars("PASSWORD_ERROR"));
    return res
      .status(httpStatus.NOT_FOUND)
      .send(functions.getResponse(STATUS, MSG_KEY, OBJECT));
  }

  const responseToSend = getToken(user);

  ({ MSG_KEY, STATUS } = successVars("FOUND"));

  res
    .header("x-auth-token", responseToSend.token)
    .status(httpStatus.OK)
    .send(functions.getResponse(STATUS, MSG_KEY, responseToSend, USER));
});

const register = catchAsync(async (req, res) => {
  const { error } = validate(req.body, true);
  let MSG_KEY, STATUS;

  if (error) {
    ({ MSG_KEY, STATUS } = failureVars(""));

    return res
      .status(httpStatus.BAD_REQUEST)
      .send(functions.getResponse(STATUS, error.details[0].message, OBJECT));
  }
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    ({ MSG_KEY, STATUS } = failureVars("USER_EXIST"));

    return res
      .status(httpStatus.NOT_FOUND)
      .send(functions.getResponse(STATUS, MSG_KEY, OBJECT));
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  ({ MSG_KEY, STATUS } = successVars("ACCOUNT_CREATED"));
  const responseToSend = getToken(user);
  res
    .header("x-auth-token", responseToSend.token)
    .status(httpStatus.OK)
    .send(functions.getResponse(STATUS, "userCreated", responseToSend, USER));
});

module.exports = {
  login,
  register,
};
