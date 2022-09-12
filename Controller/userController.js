const bcrypt = require('bcrypt');
const mySqlConnection = require('../connection')
const {sign} = require('jsonwebtoken')
module.exports.signUp = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  mySqlConnection.query('INSERT into users (name,email,password) values(?,?,?)', [name, email, hashPassword], (error, rows, fields) => {
    if (!error) {
      return res.send("user created successfully")
    }
  })

}

module.exports.signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = mySqlConnection.query('select * from users where email = ? LIMIT 1', [email], (error, row, fields) => {
    if (!row) {
      return res.send('user not found');
    }
    let passwordCompare = bcrypt.compareSync(req.body.password, row[0].password)

    if (passwordCompare) {
      const jwt = sign({
          id : row[0].id,
          name: row[0].name,
          email: row[0].email,

      },'qweeqw236',{expiresIn:"7d"});

      return res.send(jwt);
    } else {
      return res.status(400).send("incorrect password")
    };
  })
}