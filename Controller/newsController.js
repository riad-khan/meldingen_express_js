const mysql = require('../connection')

module.exports.getAllNews = async (req, res) => {
    const sql = 'SELECT a.*,b.provincie,c.regio,d.stad from nieuws a LEFT join provincie b ON a.provincie = b.id LEFT join regio c ON a.regio = c.id LEFT JOIN stad d ON a.stad = d.id'
    const fetchNews = await mysql.query(sql, (error, result, fields) => {
        if (!result) return res.status(400).send('no news found')
        return res.status(200).send(result)
    })
}
module.exports.newsDetails = async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT a.*,b.provincie,c.regio,d.stad from nieuws a LEFT join provincie b ON a.provincie = b.id LEFT join regio c ON a.regio = c.id LEFT JOIN stad d ON a.stad = d.id where a.id=' + id;

    const details = await mysql.query(sql, (error, result, fields) => {
        if (!result) return res.status(404).send('sorry! no news with this id');
        return res.status(200).send(result);
    })
}