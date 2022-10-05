
const mysql = require('../connection');
module.exports.meldingenStats = async (req, res) => {
    let from;
    let toHours;
    let finalResult;
    let chartQuery;

    const hours = req.params.hour;
    const region = req.params.region;
    const to = hours * 2;
    if (region === 'all') {
        from = `select count(id) total from melding where FROM_UNIXTIME(timestamp) > NOW() - INTERVAL ${hours} HOUR and provincie<>''`;
        toHours = `select count(id) total from melding where FROM_UNIXTIME(timestamp) > NOW() - INTERVAL ${to} HOUR and provincie<>''`;
        chartQuery = `SELECT count(id) calculated,HOUR(FROM_UNIXTIME(timestamp)) time FROM melding 
        where FROM_UNIXTIME(timestamp) > NOW() - INTERVAL ${hours} HOUR and provincie<>'' group by HOUR(FROM_UNIXTIME(timestamp));`
    } else {
        from = `select count(id) total from melding`
    }
    const recent24Hours = await Meldingen24HoursData(from);
    const previous48Hours = await MeldingenPrevious24(toHours);
    const previous_total = previous48Hours[0].total - recent24Hours[0].total;
    const parcentage = (recent24Hours[0].total - previous_total) * 100;

    if (previous_total === 0) {
        finalResult = 100;
    } else {
        finalResult = Math.round(parcentage / previous_total);
    }
    mysql.query(chartQuery, (error, results, fields) => {
        return res.send({
            count: recent24Hours[0].total,
            parcent: finalResult,
            charts: results
        })
    })
}
const Meldingen24HoursData = (from) => {
    return new Promise((resolve, reject) => {
        let query = mysql.query(from, (error, result, fields) => {
            if (error) return reject(error);
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
}
const MeldingenPrevious24 = (toHours, region) => {
    return new Promise((resolve, reject) => {
        let query = mysql.query(toHours, (error, result, fields) => {
            if (error) return reject(error);
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
}