const pup = require('puppeteer');

const url = "https://www.mercadolivre.com.br/";

const pesquisarPor = "Apple Macbook";

(async () => {

    const browser = await pup.launch({ headless: false });
    const page = await browser.newPage();
    console.log("foi")
    await page.goto(url);

    await page.waitForSelector('#cb1-edit');
    await page.type('#cb1-edit', pesquisarPor);

    await Promise.all([
        page.waitForNavigation(),
        page.click(".nav-search-btn")
    ])

    const links = await page.$$eval('.ui-search-result__content', el => el.map(link => link.href));

    for (const link of links) {
        await page.goto(link);

        const title = await page.$eval('.ui-pdp-title', element => element.innerHTML);
        const price = await page.$eval('.andes-money-amount__fraction', element => element.innerHTML);

        const view = { title, price }
        console.log(view);
    }

    await browser.close();

})();