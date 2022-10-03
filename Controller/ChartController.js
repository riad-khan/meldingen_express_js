
const mysql = require('../connection');
module.exports.meldingenStats = async (req, res) => {
    const hours = 1;
    const region = req.params.region;
    const to = hours * 2;
    let from;
    let toHours;
    if (region === 'all') {
        from = `select count(id) total from melding where FROM_UNIXTIME(timestamp) > NOW() - INTERVAL ${hours} HOUR and provincie<>''`;
        toHours = `select count(id) total from melding where FROM_UNIXTIME(timestamp) > NOW() - INTERVAL ${to} HOUR and provincie<>''`
    } else {
        from = `select count(id) total from melding`
    }
    const recent24Hours = await Meldingen24HoursData(from);
    const previous48Hours = await MeldingenPrevious24(toHours);
    console.log(recent24Hours[0], previous48Hours[0]);

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