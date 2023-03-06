const puppeteer = require("puppeteer");
const PCR = require("puppeteer-chromium-resolver");

const getArticleContent = async (url) => {
  const options = {};
  const stats = await PCR(options);
  const browser = await stats.puppeteer
    .launch({ headless: true, executablePath: stats.executablePath })
    .catch((err) => {
      console.error(err);
    });
  const page = await browser.newPage();

  await page.goto(url, { timeout: 10000, waitUntil: "domcontentloaded" });

  const articleContent = await page.evaluate(() => {
    const paragraphs = Array.from(
      document.querySelectorAll(".c-entry-content p")
    ).filter((el) => !el.closest(".c-article-footer"));
    return paragraphs.map((p) => p.textContent).join("\n");
  });

  await page.close();
  await browser.close();

  return articleContent;
};

module.exports = getArticleContent;
