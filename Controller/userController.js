const bcrypt = require('bcrypt');
const mySqlConnection = require('../connection')
const { sign } = require('jsonwebtoken');
const { stringify } = require('flatted');
const e = require('cors');
module.exports.signUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const findUser = mySqlConnection.query('select * from users where email = ? LIMIT 1', [email], (error, rows, fields) => {
    if (rows.length === 1) {
      return res.status(400).send('user already exists')
    } else {

      mySqlConnection.query('INSERT into users (name,email,password) values(?,?,?)', [name, email, hashPassword], (error, rows, fields) => {
        if (!error) {
          return res.send("user created successfully")
        }
      })
    }
  })


}

module.exports.signIn = (req, res) => {
  let rows = []
  const email = req.body.email;
  const password = req.body.password;
  const findUser = mySqlConnection.query('select * from users where email = ?', [email], (error, row, fields) => {
    if (row.length === 0) {
      return res.status(404).send('user not found in database');
    } else {
      if (row[0].password !== null) {
        let passwordCompare = bcrypt.compareSync(req.body.password, row[0].password);
        if (passwordCompare) {
          const jwt = sign({
            id: row[0].id,
            name: row[0].name,
            email: row[0].email,

          }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

          return res.send({
            access_token: jwt
          });
        } else {
          return res.status(400).send("incorrect password")
        }
      } else {
        return res.status(400).send("please Check your credentials")
      };

    }







  })
}

module.exports.userInfo = (req, res) => {
  const id = req.params.id;
  let sql = 'select profile_pic,name from users where id =?';
  const data = mySqlConnection.query(sql, (id), (error, result, fields) => {
    if (!error) {
      return res.send(result);
    } else {
      console.log(error);
    }
  })
}

module.exports.updateProfile = async (req, res) => {
  const name = JSON.stringify(req.body.name);
  const email = JSON.stringify(req.body.email);
  const password = req.body.password;
  const captcha = req.body.captcha === true ? 1 : 0;


  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  let sql = `update users set name = ${name},password = ${JSON.stringify(hashPassword)},captcha = ${captcha} where email = ${email}`;

  mySqlConnection.query(sql, (error, result, fields) => {
    if (!error) {
      const jwt = sign({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

      return res.send({
        message: "Profile updated successfully",
        token: jwt,
      });
    } else {
      console.log(error);
    }
  })

}

module.exports.fetchUserComments = async (req, res) => {
  const id = req.params.id;
  let sql = `select a.*,b.title,b.description from news_comments a left join news b on a.news_id = b.id where a.user_id = ${id}`;
  mySqlConnection.query(sql, (error, results, fields) => {
      if(!error){
        return res.status(200).send(results);
      }else{
        console.log(error);
      }
  })
}
module.exports.deleteComments = async (req, res)=>{
    const id = req.params.id;
    const user_id = req.params.user_id;
    let sql = `delete from news_comments where id = ${id} and user_id = ${user_id}`;
    mySqlConnection.query(sql,(error,results,fields)=>{
        if(!error){
          return res.status(200).send('Comments Deleted Successfully')
        }else{
          console.log(error);
        };
    })
}