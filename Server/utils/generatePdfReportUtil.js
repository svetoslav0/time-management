const puppeteer = require('puppeteer');
const fs = require('fs').promises;

const ProjectValidationErrors = require("../errors/projectsValidationErrors");

const generateReportPdf = async (reportData, templatePath) => {
    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        const htmlContent = await fs.readFile(templatePath, 'utf8');

        const filldHtmlContent = fillHoursReportTemplate(reportData, htmlContent);

        await page.setContent(filldHtmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new ProjectValidationErrors("Failed to generate PDF report!", 500);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

const fillHoursReportTemplate = (reportData, htmlContent) => {
    const hoursTableRows = generateHoursTable(reportData);

    const totalHours = reportData.hours.reduce((total, { hours = 0 }) => total + hours, 0);

    htmlContent = htmlContent
        .replace('{{projectName}}', reportData.projectData.projectName)
        .replace('{{startingDate}}', reportData.projectData.startingDate)
        .replace('{{pricePerHours}}', reportData.projectData.pricePerHours.toFixed(2))
        .replace('{{customerNames}}', reportData.projectData.customerNames.join(', '))
        .replace('{{employeeNames}}', reportData.projectData.employeeNames.join(', '))
        .replace('{{hoursTableRows}}', hoursTableRows)
        .replace('{{totalHours}}', totalHours)
        .replace('{{totalPrice}}', reportData.totalPrice.toFixed(2));

    return htmlContent;
};

const generateHoursTable = (reportData) => {
    const sortedHours = reportData.hours.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

    const startDate = new Date(sortedHours[0].date);
    const endDate = new Date(sortedHours[sortedHours.length - 1].date);

    const dateRange = [];
    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        dateRange.push(currentDate.toISOString().split('T')[0]);
    }

    const hoursMap = new Map(sortedHours.map(hour => [hour.date, hour]));

    const hoursTableRows = dateRange.map(date => {
        const hour = hoursMap.get(date) || {};
        return `<tr>
            <td>${date}</td>
            <td>${hour.employeeName || ''}</td>
            <td>${(hour.hours || 0).toString()}</td>
            <td>${hour.notes || ''}</td>
        </tr>`;
    }).join('');

    return hoursTableRows;
};


module.exports = generateReportPdf;
