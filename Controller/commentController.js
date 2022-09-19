const mysql = require('../connection');

module.exports.createComment = async (req, res) => {
    const userId = req.user.id;
    const newsId = req.params.id;
    const comments = req.body.comments;
    const sql = 'insert into news_comments (news_id,user_id,comments,posted_at,status)values(?,?,?,?,?)';
    const d = new Date();
    const insertComments = mysql.query(sql,
        [newsId, userId, comments, d,0],
        (error, result, fields) => {
            if(!error){
                return res.status(201).send('Comments created successfully')
            }else{
                console.log('something went wrong');
            }
        })
}

module.exports.getNewsComments = async(req, res)=>{
     const newsId = req.params.id;
     const sql = 'SELECT a.*,b.name FROM `news_comments` a LEFT JOIN users b ON a.user_id = b.id where a.news_id=? and a.status=?';
     mysql.query(sql,[newsId,1],(error,result,fields)=>{
        return res.status(200).json(result)
     })
}