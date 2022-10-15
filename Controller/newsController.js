const mysql = require('../connection')

module.exports.getAllNews = async (req, res) => {
    const sql = 'select * from news  order by id DESC limit 5'
    const fetchNews = await mysql.query(sql, (error, result, fields) => {
        if (!result) return res.status(400).send('no news found')
        return res.status(200).send(result)
    })
}


module.exports.getOtherNews = (req, res)=>{
   

    let sql = 'select * from news order by id DESC limit 5,5' ;

    mysql.query(sql,(error,result,fields)=>{
        return res.send(result);
    })
}

module.exports.getMoreOtherNews = (req, res)=>{
    const PageNumber = req.params.page == 0 ? 0 : req.params.page;
    const limit = 5;
    const offset = PageNumber * limit;

    let sql = 'select * from news order by id DESC limit ' + offset + ',' + limit ;

    mysql.query(sql,(error,result,fields)=>{
        return res.send(result);
    })
}


module.exports.newsDetails = async (req, res) => {
    const id = req.params.id;
    const sql = 'select * from news where id =' + id;

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
         const region = JSON.stringify(req.params.region);
        const sql = 'SELECT a.*,b.regio,b.regio_url FROM news a Left join stad c on a.city = c.stad Left join regio b  on b.id = c.regio where b.regio_url = '+region+' GROUP by c.stad ORDER BY a.id DESC limit 3';
        const data = mysql.query(sql,(error, results,fields)=>{
            if(!error) return res.status(200).send(results);
        })
};
module.exports.fetchRegios = (req, res)=>{
    const sql = "select * from regio"
    const data = mysql.query(sql,(error, result, fields)=>{
        return res.status(200).send(result)
    })
}