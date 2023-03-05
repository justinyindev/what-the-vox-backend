const SummarizerManager = require("node-summarizer").SummarizerManager;
const NUMBER_OF_SENTENCES = 7;
require("dotenv").config();

const summarizeContent = (text_to_summarize) => {
  const Summarizer = new SummarizerManager(
    text_to_summarize,
    NUMBER_OF_SENTENCES
  );
  const summary = Summarizer.getSummaryByFrequency().summary;

  return summary;
};

module.exports = summarizeContent;
