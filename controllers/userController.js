const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const expiresIn="3600"
const createToken = (id) => {
  return jwt.sign(id, process.env.SECRET_KEY, {expiresIn});
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = User.signup({ name, email, password });
    const id = user._id
    const token = createToken({id});

    if (user) {
      res.status(200).send({ token: token, data:name });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = User.login({ name,  password });
    const token = createToken({id:user._id});

    if (user) {
      res.status(200).send({ message: "login successful", token: token, data:name });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
