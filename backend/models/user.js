const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    config.get("jwtPrivateKey")
  );
};
const User = mongoose.model("User", userSchema);

function validateUser(user, isRegistration) {
  const schema = {
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .required(),
  };
  if (isRegistration) {
    schema.name = Joi.string().min(5).max(50).required();
  }
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
