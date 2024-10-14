const path = require("path");
const fs = require("fs");

const handlebars = require("handlebars");

const { formatDateWithDay } = require("../../utils/formatDateUtil");

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

  const hoursMap = new Map();
  sortedHours.forEach(hour => {
      if (!hoursMap.has(hour.date)) {
          hoursMap.set(hour.date, []);
      }
      hoursMap.get(hour.date).push(hour);
  });

  const hoursTableRows = dateRange.map(date => {
      const hoursForDate = hoursMap.get(date) || [{}];
      return hoursForDate.map(hour => {
          return tableTemplate({
              date: formatDateWithDay(date),
              hours: (hour.hours || 0).toString(),
              notes: hour.notes || ''
          });
      }).join('');
  }).join('');

  return new handlebars.SafeString(hoursTableRows);
});
