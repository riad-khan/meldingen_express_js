const mysql = require('../connection');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 600 });

module.exports.getAllNews = async (req, res) => {
    const sql = 'select * from news  order by id DESC limit 5';
    let key = "news"
    if (myCache.has(`${key}`)) {
        return res.send(myCache.get(`${key}`));
    } else {
        const data = await news(sql);
        myCache.set(`${key}`, data, 300);
        return res.send(data)
    }

}
const news = (sql) => {
    return new Promise((resolve, reject) => {
        let query = mysql.query(sql, (error, result, fields) => {
            if (error) return reject(error);
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
}


module.exports.getOtherNews = (req, res) => {
    let sql = 'select * from news where state <>"" and city <>"" order by id DESC limit 5,5';
    mysql.query(sql, (error, result, fields) => {
        return res.send(result);
    })
}

module.exports.getMoreOtherNews = (req, res) => {
    const PageNumber = req.params.page == 0 ? 0 : req.params.page;
    const limit = 5;
    const offset = PageNumber * limit;

    let sql = 'select * from news where state <>"" and city <>"" order by id DESC limit ' + offset + ',' + limit;

    mysql.query(sql, (error, result, fields) => {
        return res.send(result);
    })
}


module.exports.newsDetails = async (req, res) => {
    let id = req.params.id;
    let key = `news_details ${id}`;

    if (myCache.get(`${key}`) == undefined) {
        const data = await news_details(id);
        myCache.set(`${key}`, data[0], 3600);
        return res.send(data[0])
    } else {
        console.log('from cache');
        return res.send(myCache.get(`${key}`));
    }



}

const news_details = (id) => {
    return new Promise((resolve, reject) => {
        let query = mysql.query('select * from news where id =?', [id], (error, result, fields) => {
            if (error) return reject(error);
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
}

module.exports.recentNews = async (req, res) => {
    const data = await recent();
    return res.send(data)
};

const recent = (sql)=>{
    return new Promise((resolve, reject) => {
        let query = mysql.query('SELECT * from news order by id DESC limit 6', (error, result, fields) => {
            if (error) return reject(error);
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
}

module.exports.filteredNews = (req, res) => {
    const region = req.params.region;
    const sql = `SELECT * FROM news WHERE state LIKE "%${region}%" or city LIKE "%${region}%" or staddress LIKE "%${region}%" order by id DESC limit 7`;
    const data = mysql.query(sql, (error, results, fields) => {
        if(error){
            console.log(error);
        }else{
            return res.status(200).send(results)
        }
        
    })
};
module.exports.fetchRegios = async (req, res) => {
    const sql = "SELECT a.regio,a.regio_url,b.provincie,b.provincie_url FROM regio a LEFT join provincie b on a.provincie = b.id where a.provincie <>'';"

    let key = "regios";
    let value = myCache.get(key);

    if (value == undefined) {
        const data = await regio(sql);
        myCache.set(key, data,0);
        return res.send(data);
    } else {
        console.log('regio cache');
        return res.send(myCache.get(key))

    }

};

const regio = (sql) => {
    return new Promise((resolve, reject) => {
        let query = mysql.query(sql, (error, result, fields) => {
            if (error) return reject(error);
            resolve(Object.values(JSON.parse(JSON.stringify(result))))
        })
    })
};
module.exports.recentMeldingen = (req, res) => {
    let sql = 'SELECT a.`id`,a.p2000,a.straat,a.straat_url,a.lat,a.lng,a.prio,a.timestamp,';
    sql += ' b.provincie,c.regio,c.regio_url,d.categorie,e.dienst,f.stad,f.stad_url';
    sql += ' from melding a LEFT JOIN provincie b ON a.provincie = b.id LEFT JOIN regio c ON a.regio = c.id LEFT JOIN categorie';
    sql += ' d ON a.categorie = d.id LEFT JOIN dienst e ON a.dienst = e.id LEFT JOIN stad f ON a.stad = f.id Order by a.id DESC limit 5';

    mysql.query(sql, (error, results, fields) => {
        if (!error) {
            return res.send(results)
        }
    })
}