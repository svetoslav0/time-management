const path = require("path");
const fs = require("fs");

const handlebars = require("handlebars");

const tableTemplatePath = path.join(__dirname, '../../templates/projectReport/hoursTableTemplate.hbs');
const tableTemplateSource = fs.readFileSync(tableTemplatePath, 'utf8');
const tableTemplate = handlebars.compile(tableTemplateSource);

handlebars.registerHelper('generateHoursTable', (hours) => {
    const sortedHours = hours.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

    const startDate = new Date(sortedHours[0].date);
    const endDate = new Date(sortedHours[sortedHours.length - 1].date);

    const dateRange = [];
    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        dateRange.push(currentDate.toISOString().split('T')[0]);
    }

    const hoursMap = new Map(sortedHours.map(hour => [hour.date, hour]));

    const hoursTableRows = dateRange.map(date => {
        const hour = hoursMap.get(date) || {};
        return tableTemplate({
          date,
          employeeName: hour.employeeName || '',
          hours: (hour.hours || 0).toString(),
          notes: hour.notes || ''
        });
      }).join('');

    return new handlebars.SafeString(hoursTableRows);
});