const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://ifitness.vn/blogs/kien-thuc-the-hinh/thuc-pham-tang-co"
    );
    let urls = await page.evaluate(() => {
      let results = [];
      let items = document.querySelectorAll("h3 > strong");
      for (const item of items) {
        if (item.innerText.includes("1. Cung cấp")) break;
        if (item.innerText !== "")
          results.push({
            food: item.innerText.split(".")[1].trimStart(),
            chosenState: "empty",
          });
      }
      return results;
    });

    await browser.close();

    // Convert data to JSON
    const jsonData = JSON.stringify(urls, null, 2);

    // Write JSON data to a file
    fs.writeFile("ingredients.json", jsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Data has been written to ingredients.json");
    });

    return urls;
  } catch (e) {
    console.error(e);
    return [];
  }
}

run()
  .then((data) => {
    console.log("Scraped data:", data);
  })
  .catch(console.error);
