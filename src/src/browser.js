// const puppeteer = require('puppeteer')
const chromium = require('chrome-aws-lambda');

module.exports = {
    printPageToPDF: async (url, parameters) => {

        const browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.goto(`file://${url}`, {
            waitUntil: 'networkidle2'
        })
        
        await replaceTemplate(page, parameters)

        await page.emulateMedia('screen')

        const pdf = await page.pdf({
            margin: {
                bottom: 0,
                top: 0,
                left: 0,
                right: 0,
            },
            preferCSSPageSize: true,
            printBackground: true

        })

        await browser.close();

        return pdf
    },

}

const replaceTemplate = async (page, parameters) => {
    await page.evaluate((parameters) => {
        let html = document.body.innerHTML;

        for( const key in parameters ) {
            let value = parameters[key]

            if( typeof value === 'undefined' ) {
                value = `______UNDEFINED_VARIABLE_____(${key})`
            }

            html = html.split(`{{${key}}}`).join(value)
        }
        document.body.innerHTML = html
    }, parameters);
}
