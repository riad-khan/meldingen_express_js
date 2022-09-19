const mysql = require('../connection');

module.exports.getBlogs = async(req, res)=>{
    const sql = "select * from blogs where status = 'published'"
    const blogsData = mysql.query(sql,(error,result,fields)=>{
        return res.status(200).json(result);
    })
}
module.exports.blogDetails = async(req, res)=>{
    const sql = "select * from blogs where id = ? and status=?";
    const id = req.params.id
    const blog_details = mysql.query(sql,[id,'published'],(error,rows,fields)=>{
        return res.status(200).json(rows)
    })
}