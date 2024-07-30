const handlebars = require('handlebars');

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
        return `<tr>
            <td>${date}</td>
            <td>${hour.employeeName || ''}</td>
            <td>${(hour.hours || 0).toString()}</td>
            <td>${hour.notes || ''}</td>
        </tr>`;
    }).join('');

    return new handlebars.SafeString(hoursTableRows);
});