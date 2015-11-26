var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'johnyduval',
  password : '',
  database : 'addressbook'
});

connection.query("select * from Account join AddressBook on Account.id = AddressBook.accountId limit 5", function(err, result) {
  // In this callback, rows will be all the rows of the query, in a regular array of regular objects
  // fields is not used very often, but it will contain a listing of the columns with some metadata
  if (err){
    console.log(err);
  } else {
  // Here is an example usage:
  result.forEach(function(row) {
    console.log(('#' + row.accountId + ": ").bold + row.email);
    });
  }
  // This code will output lines like:
  // #1: john@smith.com
  // #2: abc@def.com
  // #5: xx@yy.com
  connection.end();
  // Note that IDs do not have to be contiguous. If we DELETE rows, there will be holes in the ID list. This is normal.
});
