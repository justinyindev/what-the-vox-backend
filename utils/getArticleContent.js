const puppeteer = require("puppeteer");

const getArticleContent = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );

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
