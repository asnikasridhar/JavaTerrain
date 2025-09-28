const RainReport = require('../models/rainReportModel');
const ExcelJS = require('exceljs');

exports.getRainReport = async (req, res) => {
  try {
    console.log('Im called')
    const { startDate, endDate, propertyId, blockId, format } = req.query;

    const report = await RainReport.generate({
      startDate,
      endDate,
      propertyId,
      blockId
    });

    if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();

      const styleHeader = (worksheet) => {
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        worksheet.autoFilter = 'A1:' + worksheet.getRow(1).lastCell.address;
      };

      // Function to apply conditional formatting
      const applyConditionalFormatting = (worksheet, columnKey) => {
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber === 1) return; // skip header
          const cell = row.getCell(columnKey);
          const value = parseFloat(cell.value);
          if (value > 50) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } }; // Red
          } else if (value >= 20) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } }; // Yellow
          } else if (value < 20) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00FF00' } }; // Green
          }
        });
      };

      // Sheet 1: Summary
      const summarySheet = workbook.addWorksheet('Summary');
      summarySheet.addRow(['Total Rainfall', report.totalRainfall]);
      summarySheet.addRow([]);
      summarySheet.addRow(['Generated On', new Date().toLocaleString()]);
      summarySheet.getColumn(1).width = 20;
      summarySheet.getColumn(2).width = 20;

      // Sheet 2: Rainfall by Block
      const blockSheet = workbook.addWorksheet('By Block');
      blockSheet.columns = [
        { header: 'Block Name', key: 'block_name', width: 25 },
        { header: 'Total Rainfall', key: 'total_rainfall', width: 20 }
      ];
      report.rainfallByBlock.forEach(item => blockSheet.addRow(item));
      styleHeader(blockSheet);
      applyConditionalFormatting(blockSheet, 2);

      // Sheet 3: Daily Rainfall
      const dailySheet = workbook.addWorksheet('Daily');
      dailySheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Total Rain', key: 'total_rain', width: 15 }
      ];
      report.dailyRainfall.forEach(item => dailySheet.addRow(item));
      styleHeader(dailySheet);
      applyConditionalFormatting(dailySheet, 2);

      // Sheet 4: Weekly Rainfall
      const weeklySheet = workbook.addWorksheet('Weekly');
      weeklySheet.columns = [
        { header: 'Year', key: 'year', width: 10 },
        { header: 'Week', key: 'week', width: 10 },
        { header: 'Total Rain', key: 'total_rain', width: 15 }
      ];
      report.weeklyRainfall.forEach(item => weeklySheet.addRow(item));
      styleHeader(weeklySheet);
      applyConditionalFormatting(weeklySheet, 3);

      // Sheet 5: Monthly Rainfall
      const monthlySheet = workbook.addWorksheet('Monthly');
      monthlySheet.columns = [
        { header: 'Year', key: 'year', width: 10 },
        { header: 'Month', key: 'month', width: 10 },
        { header: 'Total Rain', key: 'total_rain', width: 15 }
      ];
      report.monthlyRainfall.forEach(item => monthlySheet.addRow(item));
      styleHeader(monthlySheet);
      applyConditionalFormatting(monthlySheet, 3);

      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.attachment('rain_report_conditional.xlsx');
      await workbook.xlsx.write(res);
      return res.end();
    }

    // Default JSON response
    res.status(200).json({ success: true, data: report });

  } catch (error) {
    console.error('Error generating rain report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate rain report',
      error: error.message
    });
  }
};
