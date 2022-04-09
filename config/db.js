let mysql = require('mysql')

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "mini_project_apidb"
})
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected DB!");
});
module.exports = db
