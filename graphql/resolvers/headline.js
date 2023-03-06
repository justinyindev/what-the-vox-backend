const Headline = require("./../../models/headline");
const getArticleContent = require("./../../utils/getArticleContent");
const summarizeContent = require("./../../utils/summarizeContent");

module.exports = {
  headlines: async ({ startDate, endDate }) => {
    try {
      if (!startDate && !endDate) {
        const latestHeadline = await Headline.findOne()
          .sort({ date: -1 })
          .lean();
        return [latestHeadline];
      }
      let query = {};
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        query.date = { $gte: start, $lte: end };
      }
      const headlines = await Headline.find(query).sort({ date: -1 }).lean();
      return headlines;
    } catch (error) {
      console.error(error);
    }
  }
};
