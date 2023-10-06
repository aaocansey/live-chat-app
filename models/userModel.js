const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.signup = async function ({ name, email, password }) {
  if (!name || !email || !password) {
    throw Error("All fields must be field");
  }

  // if (!validator.body.isEmail()) {
  //   throw Error("Invalid email");
  // }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function ({name,password}) {
  if (!name || !password) {
    throw Error("All fields must be field");
  }
  const user = await this.findOne({ name });
  if (!user) {
    throw Error("user nit found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
