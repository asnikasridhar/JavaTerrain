// controllers/rainReportController.js
const RainReport = require('../models/rainReportModel');
const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');

exports.getRainReport = async (req, res) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      propertyId: req.query.propertyId,
      blockId: req.query.blockId
    };

    const data = await RainReport.generate(filters);
    const format = req.query.format || 'json';

    if (format === 'csv') {
      const parser = new Parser();
      const csv = parser.parse(data);
      res.header('Content-Type', 'text/csv');
      res.attachment('rain_report.csv');
      return res.send(csv);
    }

    if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Rain Report');

      // Flatten + dump data
      sheet.addRow(['Total Rainfall', data.totalRainfall]);
      sheet.addRow([]);
      sheet.addRow(['Daily Rainfall']);
      sheet.addRow(['Date', 'Total Rain']);
      data.dailyRainfall.forEach(r => sheet.addRow([r.date, r.total_rain]));
      sheet.addRow([]);
      sheet.addRow(['Weekly Rainfall']);
      sheet.addRow(['Year', 'Week', 'Total Rain']);
      data.weeklyRainfall.forEach(r => sheet.addRow([r.year, r.week, r.total_rain]));
      sheet.addRow([]);
      sheet.addRow(['Monthly Rainfall']);
      sheet.addRow(['Year', 'Month', 'Total Rain']);
      data.monthlyRainfall.forEach(r => sheet.addRow([r.year, r.month, r.total_rain]));
      sheet.addRow([]);
      sheet.addRow(['Rainfall By Block']);
      sheet.addRow(['Block', 'Total Rainfall']);
      data.rainfallByBlock.forEach(r => sheet.addRow([r.block_name, r.total_rainfall]));

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=rain_report.xlsx');

      await workbook.xlsx.write(res);
      return res.end();
    }

    // Default JSON
    res.json({ success: true, data });

  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
