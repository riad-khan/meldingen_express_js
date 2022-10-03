const mySqlConnection = require('../connection')
module.exports.fetchMeldingen = (req, res) => {

    const PageNumber = req.params.page == 0 ? 0 : req.params.page;
    const limit = 21;
    const offset = PageNumber * limit;
    let sql = 'SELECT a.`id`,a.p2000,a.straat,a.straat_url,a.lat,a.lng,a.prio,a.timestamp,';
    sql += ' b.provincie,c.regio,c.regio_url,d.categorie,e.dienst,f.stad,f.stad_url';
    sql += ' from melding a LEFT JOIN provincie b ON a.provincie = b.id LEFT JOIN regio c ON a.regio = c.id LEFT JOIN categorie';
    sql += ' d ON a.categorie = d.id LEFT JOIN dienst e ON a.dienst = e.id LEFT JOIN stad f ON a.stad = f.id Order by a.id DESC limit ' + offset + ',' + limit;


    const meldingen = mySqlConnection.query(sql,
        (error, rows, fields) => {
            if (error) {
                return res.send('no data found')
            } else {
                return res.status(200).send(rows)
            }
        })
}

module.exports.meldingenDetails = async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT a.*, b.provincie,c.regio,d.categorie from melding a LEFT JOIN provincie b ON a.provincie = b.id LEFT JOIN regio c ON a.regio = c.id LEFT JOIN categorie d ON a.categorie = d.id where a.id = ' + id;
    const details = await mySqlConnection.query(sql, (error, rows, fields) => {
        return res.status(200).send(rows)
    })

}

module.exports.filterMeldingen = async (req, res) => {
    const regio = req.params.regio;
    const PageNumber = req.params.page == 0 ? 0 : req.params.page;
    const limit = 21;
    const offset = PageNumber * limit;
    let sql = 'SELECT a.`id`,a.p2000,a.straat,a.straat_url,a.lat,a.lng,a.prio,a.timestamp,';
    sql += ' b.provincie,c.regio,c.regio_url,d.categorie,e.dienst,f.stad,f.stad_url';
    sql += ' from melding a LEFT JOIN provincie b ON a.provincie = b.id LEFT JOIN regio c ON a.regio = c.id LEFT JOIN categorie';
    sql += ' d ON a.categorie = d.id LEFT JOIN dienst e ON a.dienst = e.id LEFT JOIN stad f ON a.stad = f.id where c.regio_url =? Order by a.id DESC limit ' + offset + ',' + limit;

    const result = mySqlConnection.query(sql, [regio], (error, rows, fields) => {
        if (!error) {
            return res.send(rows);
        } else {
            console.log(error);
        }
    })



}


module.exports.searchComplete = async (req, res) => {
    const searchString = req.query.search;
    let sql = `SELECT a.stad,a.stad_url,b.provincie,b.provincie_url,c.regio,c.regio_url from stad a, provincie b, regio c WHERE a.stad LIKE '${searchString}%' and a.provincie = b.id and a.regio = c.id limit 10`;
    const result = await mySqlConnection.query(sql,(error,rows,fields)=>{
      if(error){
        return res.send(error)
      }else{
       return res.send(rows)
      }
    })

    

}
