const puppeteer = require('puppeteer'); 

async function parse(data){ 
  const {link, end, headers = {}} = data;
  try {
    let browser = await puppeteer.launch({
      headless: false, // false,
      slowMo: 100,
      devtools: true
    })
    let page = await browser.newPage();
    page.setExtraHTTPHeaders(headers);
    await page.setViewport({
      width: 800, height: 600
    });
    await page.goto(link);
    await page.waitForSelector(end);
    let res = await page.evaluate(async (wa, args) => {
      let {card, title, imgUrl, linkEl, price, end} = args;
      let page1 = [];
      try {
        let divs = document.querySelectorAll(card);
        divs.forEach(div => {
          let obj = {
            title: div.querySelector(title).innerText,
            imgUrl: div.querySelector(imgUrl).src,
            linkEl: div.querySelector(linkEl).href,
            price: div.querySelector(price).innerText.trim()
          }
          page1.push(obj);
        })
      } catch (e) {
        console.log(e);
      }
      return page1;
    }, {waitUntil: end}, data)
    await browser.close();
    return res;
  } catch (e) {
    console.log(e);
    await browser.close();
  }
}

module.exports = parse;
