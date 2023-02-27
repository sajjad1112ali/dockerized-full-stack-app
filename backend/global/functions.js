const messages = require("../messages/messages");
const httpStatus = require("http-status");

const getResponse = (status, message, data, name) => {
  let msgText = message;

  let isPlural = "";
  const msgFound = messages[message];
  const msg = msgFound ? msgFound : msgText;
  if ((data["offset"] !== undefined || Array.isArray(data)) && msgFound) {
    isPlural = "s";
  }
  msgText = msg.replace("{{MODEL_NAME}}", `${name}${isPlural}`);

  return {
    status,
    message: msgText,
    data,
  };
};

const defaultData = {
  OBJECT: {},
  ARRAY: [],
  BLOG: "Blog",
  USER: "User",
};

const msgKeysObj = {
  FOUND: "DATA_FOUND",
  NOT_FOUND: "DATA_NOT_FOUND",
  SAVED: "DATA_SAVED",
  UPDATED: "DATA_UPDATED",
  DELETED: "DATA_DELETED",
  EMAIL_ERROR: "EMAIL_NOT_FOUND",
  PASSWORD_ERROR: "PASSWORD_MISSMATCHED",
  USER_EXIST: "EMAIL_EXIST",
  ACCOUNT_CREATED: "ACCOUNT_CREATED",
};

const successVars = (msgKey) => {
  return {
    MSG_KEY: msgKeysObj[msgKey] || "ERROR",
    STATUS: 1,
  };
};

const failureVars = (msgKey) => {
  return {
    MSG_KEY: msgKeysObj[msgKey] || "ERROR",
    STATUS: 0,
  };
};

module.exports = {
  getResponse,
  defaultData,
  successVars,
  failureVars,
};
