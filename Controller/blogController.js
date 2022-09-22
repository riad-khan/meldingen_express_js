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

module.exports.recentBlogs = (req, res)=>{
    const sql = 'SELECT * FROM `blogs` where status = "published" ORDER BY `created_at` DESC limit 5';
    const blogs = mysql.query(sql,(error, result, fields)=>{
            return res.status(200).send(result);
    })
}

module.exports.category = (req,res)=>{
    const sql  = 'select * from blog_categories';
    const all_categories = mysql.query(sql,(error, result , fields)=>{
        return res.status(200).send(result);
    })
}

module.exports.filteredBlogs = (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM `blogs` WHERE FIND_IN_SET(?,`categories`) and status = ?";
    const data = mysql.query(sql,[id,'published'],(error, result, fields)=>{
        return res.status(200).send(result)
    })
}
