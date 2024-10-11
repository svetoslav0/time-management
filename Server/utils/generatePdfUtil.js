const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const handlebars = require("handlebars");

const ApiException = require("../errors/ApiException");

require("../helpers/projectReport/generateHoursTableHelper");

const generatePdf = async (reportData, templatePath) => {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const htmlContent = await fs.readFile(templatePath, 'utf8');
        const template = handlebars.compile(htmlContent);

        const filledHtmlContent = template(reportData);

        await page.setContent(filledHtmlContent, { waitUntil: 'networkidle0' });
        await page.emulateMediaType("print");
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new ApiException("Failed to generate PDF!", 500);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = generatePdf;
