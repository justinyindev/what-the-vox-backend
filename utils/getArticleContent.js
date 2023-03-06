const puppeteer = require("puppeteer");

const getArticleContent = async (url) => {
  const browser = await puppeteer.launch({ headless: true }).catch((err) => {
    console.error(err);
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

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
