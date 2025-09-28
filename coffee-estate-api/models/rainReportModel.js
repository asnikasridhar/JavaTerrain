const db = require('../config/db');

class RainReport {
  // Generate Rain Report
  static async generate(filters = {}) {
    const { startDate, endDate, propertyId, blockId } = filters;

    let conditions = [];
    let params = [];

    if (startDate) {
      conditions.push('r.date_time >= ?');
      params.push(startDate);
    }
    if (endDate) {
      conditions.push('r.date_time <= ?');
      params.push(endDate);
    }
    if (propertyId) {
      conditions.push('p.property_id = ?');
      params.push(propertyId);
    }
    if (blockId) {
      conditions.push('b.block_id = ?');
      params.push(blockId);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    // Total rainfall
    const [totalRainfall] = await db.execute(`
      SELECT SUM(r.rain_amount) AS total_rainfall
      FROM RainDetails r
      INNER JOIN blocks b ON r.block_id = b.block_id
      INNER JOIN property p ON b.property_id = p.property_id
      ${whereClause}
    `, params);

    // Rainfall per block
    const [rainfallByBlock] = await db.execute(`
      SELECT b.block_name, SUM(r.rain_amount) AS total_rainfall
      FROM RainDetails r
      INNER JOIN blocks b ON r.block_id = b.block_id
      INNER JOIN property p ON b.property_id = p.property_id
      ${whereClause}
      GROUP BY b.block_name
    `, params);

    // Daily rainfall
    const [dailyRainfall] = await db.execute(`
      SELECT DATE(r.date_time) AS date, SUM(r.rain_amount) AS total_rain
      FROM RainDetails r
      INNER JOIN blocks b ON r.block_id = b.block_id
      INNER JOIN property p ON b.property_id = p.property_id
      ${whereClause}
      GROUP BY DATE(r.date_time)
      ORDER BY DATE(r.date_time) ASC
    `, params);

    // Weekly rainfall
    const [weeklyRainfall] = await db.execute(`
      SELECT YEAR(r.date_time) AS year, WEEK(r.date_time, 1) AS week, SUM(r.rain_amount) AS total_rain
      FROM RainDetails r
      INNER JOIN blocks b ON r.block_id = b.block_id
      INNER JOIN property p ON b.property_id = p.property_id
      ${whereClause}
      GROUP BY YEAR(r.date_time), WEEK(r.date_time, 1)
      ORDER BY year ASC, week ASC
    `, params);

    // Monthly rainfall
    const [monthlyRainfall] = await db.execute(`
      SELECT YEAR(r.date_time) AS year, MONTH(r.date_time) AS month, SUM(r.rain_amount) AS total_rain
      FROM RainDetails r
      INNER JOIN blocks b ON r.block_id = b.block_id
      INNER JOIN property p ON b.property_id = p.property_id
      ${whereClause}
      GROUP BY YEAR(r.date_time), MONTH(r.date_time)
      ORDER BY year ASC, month ASC
    `, params);

    return {
      totalRainfall: totalRainfall[0]?.total_rainfall || 0,
      rainfallByBlock,
      dailyRainfall,
      weeklyRainfall,
      monthlyRainfall
    };
  }
}

module.exports = RainReport;
