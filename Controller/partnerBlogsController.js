const mysql = require('../connection');

module.exports.fetchPartnerBlogs = async (req, res) => {
    const sql = 'SELECT * FROM `partner_blogs` WHERE`status`= "published"';
    const blogs = await mysql.query(sql, (error, result, fields) => {
        return res.send(result);
    })
}

module.exports.partnerBlogDetails = async(req, res)=>{
    const id = req.params.id;
    const sql = 'SELECT * FROM `partner_blogs` WHERE`status`= "published" and id ='+id;
    const details = await mysql.query(sql, (error, result, fields) =>{
            return res.status(200).send(result);
    })
}