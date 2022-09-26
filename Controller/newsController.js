const mysql = require('../connection')

module.exports.getAllNews = async (req, res) => {
    const sql = 'SELECT a.*,b.provincie,c.regio_url,c.regio,d.stad from nieuws a LEFT join provincie b ON a.provincie = b.id LEFT join regio c ON a.regio = c.id LEFT JOIN stad d ON a.stad = d.id ORDER BY a.id DESC'
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

module.exports.recentNews = (req, res)=>{
        const sql = 'SELECT a.*,b.provincie,c.regio_url,c.regio,d.stad from nieuws a LEFT join provincie b ON a.provincie = b.id LEFT join regio c ON a.regio = c.id LEFT JOIN stad d ON a.stad = d.id ORDER BY timestamp DESC limit 6';
        const data = mysql.query(sql,(error, result, fields)=>{
            return res.status(200).send(result)
        })
};

module.exports.filteredNews = (req, res)=>{
        const regio = req.params.region
        const sql = 'SELECT a.*,b.provincie,c.regio_url,c.regio,d.stad from nieuws a LEFT join provincie b ON a.provincie = b.id LEFT join regio c ON a.regio = c.id LEFT JOIN stad d ON a.stad = d.id where c.regio_url=? ORDER BY a.id DESC';
        const data = mysql.query(sql,[regio],(error, results,fields)=>{
            if(!error) return res.status(200).send(results);
        })
};
module.exports.fetchRegios = (req, res)=>{
    const sql = "select * from regio"
    const data = mysql.query(sql,(error, result, fields)=>{
        return res.status(200).send(result)
    })
}