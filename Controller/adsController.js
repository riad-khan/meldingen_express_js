const mysql = require('../connection');

module.exports.getHomePageAds = async(req, res)=>{
    const sql1 = 'SELECT content FROM `ads` WHERE content<>"" and status=1 and section=1 and DATE_FORMAT(curtime(), "%H:%i")>=from_hr and DATE_FORMAT(curtime(), "%H:%i")<=to_hr limit 1';
    const sql2 = 'SELECT content FROM `ads` WHERE content<>"" and status=1 and section=2 and DATE_FORMAT(curtime(), "%H:%i")>=from_hr and DATE_FORMAT(curtime(), "%H:%i")<=to_hr limit 1;';
    const sql3 = 'SELECT content FROM `ads` WHERE content<>"" and status=1 and section=3 and DATE_FORMAT(curtime(), "%H:%i")>=from_hr and DATE_FORMAT(curtime(), "%H:%i")<=to_hr limit 1;';

   const ad1 = await ads(sql1);
    const ad2 = await ads(sql2);
    const ad3 = await ads(sql3);

    return res.send({
        ad1 : ad1,
        ad2 : ad2,
        ad3 : ad3,
    })
}

const ads = (from) => {
    return new Promise((resolve, reject) => {
        let query = mysql.query(from, (error, result, fields) => {
            if (error) return reject(error);
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
};