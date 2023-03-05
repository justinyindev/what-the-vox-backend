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
      const headlines = await Headline.find(query).sort({date: -1}).lean();
      return headlines;
    } catch (error) {
      console.error(error);
    }
  },
  summary: async ({ title, url }) => {
    try {
      const headline = await Headline.findOne({ title: title }).lean();

      if (!headline.summary) {
        const articleContent = await getArticleContent(url);
        const summarizedContent = summarizeContent(articleContent);

        const updatedHeadline = await Headline.findByIdAndUpdate(
          headline._id,
          { summary: summarizedContent },
          { new: true }
        ).lean();

        console.log("saving summary to database");
        return updatedHeadline;
      }
      return headline;
    } catch (error) {
      console.error(error);
    }
  },
};
