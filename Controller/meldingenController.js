const mySqlConnection = require('../connection')
module.exports.fetchMeldingen = async(req, res)=>{
  const meldingen =  await mySqlConnection.query('SELECT a.*, b.provincie,c.regio,d.categorie from melding a LEFT JOIN provincie b ON a.provincie = b.id LEFT JOIN regio c ON a.regio = c.id LEFT JOIN categorie d ON a.categorie = d.id limit 100',(error,rows,fields)=>{
       if(error){
            return res.send('no data found')
       }else{
           return res.status(200).send({
                  data: rows
           })
       }
    })
}

module.exports.meldingenDetails = async(req, res) =>{
    const id = req.params.id;
    const sql = 'SELECT a.*, b.provincie,c.regio,d.categorie from melding a LEFT JOIN provincie b ON a.provincie = b.id LEFT JOIN regio c ON a.regio = c.id LEFT JOIN categorie d ON a.categorie = d.id where a.id = '+id;
    const details = await mySqlConnection.query(sql,(error,rows,fields)=>{
        return res.status(200).send(rows)
    })

}