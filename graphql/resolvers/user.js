const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../../models/user");
require("dotenv").config();

module.exports = {
  createUser: async ({ userInput }) => {
    try {
      const existingUser = await User.findOne({ username: userInput.username });
      if (existingUser) {
        return null;
      }
      const hashedPassword = await bcrypt.hash(userInput.password, 12);
      const user = new User({
        user_id: uuidv4(),
        username: userInput.username,
        password: hashedPassword,
        bookmarks: [],
      });
      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      console.error(err);
    }
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      console.log("user does not exist");
      return null;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      console.log("Incorrect credentials");
      return null;
    }
    const token = jwt.sign({ user_id: user.user_id }, process.env.BCRYPT_KEY, {
      expiresIn: "1h",
    });
    return {
      user_id: user.user_id,
      token: token,
      tokenExpiration: 1,
      username: user.username,
      bookmarks: user.bookmarks,
    };
  },
  bookmark: async ({ title }, { req }) => {
    if (!req.isAuth) {
      console.log("User not logged in");
      return null;
    }
    const user = await User.findOne({ user_id: req.user_id });
    if (!user) {
      throw new Error("User not found");
    }

    const index = user.bookmarks.indexOf(title);
    if (index >= 0) {
      user.bookmarks.splice(index, 1);
    } else {
      user.bookmarks.push(title);
    }

    const result = await user.save();
    return result;
  },
};
