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
        return {
          user_id: "",
          username: "",
          password: "",
          liked_articles: [],
        };
      }
      const hashedPassword = await bcrypt.hash(userInput.password, 12);
      const user = new User({
        user_id: uuidv4(),
        username: userInput.username,
        password: hashedPassword,
        liked_articles: [],
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
    return { user_id: user.user_id, token: token, tokenExpiration: 1 };
  },
  likeArticle: async ({ articleTitle }, { req }) => {
    if (!req.isAuth) {
      console.log("User not logged in");
      return null;
    }
    const user = await User.findOne({ user_id: req.user_id });
    if (!user) {
      throw new Error("User not found");
    }

    const articleIndex = user.liked_articles.indexOf(articleTitle);
    if (articleIndex >= 0) {
      user.liked_articles.splice(articleIndex, 1);
    } else {
      user.liked_articles.push(articleTitle);
    }

    const result = await user.save();
    return result;
  },
};
