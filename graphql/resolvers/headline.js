const Headline = require("./../../models/headline");

module.exports = {
  headlines: async ({ startDate, endDate, page, limit }) => {
    try {
      let query = {};
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        query.date = { $gte: start, $lte: end };
      }

      const totalHeadlines = await Headline.countDocuments(query);
      const totalPages = Math.ceil(totalHeadlines / limit);

      const headlines = await Headline.find(query)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
      
      return {
        headlines,
        pageInfo: {
          currentPage: page,
          totalPages: totalPages
        }
      };
    } catch (error) {
      console.error(error);
    }
  },
};
