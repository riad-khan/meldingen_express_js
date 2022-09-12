const mysql = require('mysql');
let mySqlConnection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database : "express_text",
    multipleStatements : true,
})


mySqlConnection.connect((err)=>{
    if(!err){
        console.log('connected Successfully');
    }else{
        console.log("not connected");
    }
})

module.exports = mySqlConnection