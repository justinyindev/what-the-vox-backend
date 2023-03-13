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
      throw err;
    }
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return {
        userId: "",
        token: "",
        tokenExpiration: 0,
      };
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return {
        userId: "",
        token: "",
        tokenExpiration: 0,
      };
    }
    const token = jwt.sign({ userId: user.id }, process.env.BCRYPT_KEY, {
      expiresIn: "1h",
    });
    return { userId: user.user_id, token: token, tokenExpiration: 1 };
  },
  likeArticle: async ({ userId, articleTitle }) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.likedArticles.includes(articleTitle)) {
      throw new Error("Article already liked");
    }
    user.likedArticles.push(articleTitle);
    const result = await user.save();
    return result;
  },
};
