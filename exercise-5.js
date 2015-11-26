var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'johnyduval',
    password: '',
    database: 'addressbook'
});

connection.query("select Account.id as account_id, Account.email as account_email, AddressBook.id as addressbook_id, AddressBook.name as addressbook_name from Account left outer join AddressBook on Account.id = AddressBook.accountId", function(err, result) {
    // In this callback, rows will be all the rows of the query, in a regular array of regular objects
    // fields is not used very often, but it will contain a listing of the columns with some metadata
    if (err) {
        console.log(err);
    }
    else {
        
        var temp = 0;
        // Here is an example usage:
        result.forEach(function(row) {
            
            if (temp === row.account_id) {
                console.log(row.addressbook_name);
            }
            else if (!row.addressbook_name){
                console.log(('#' + row.account_id + ": ").bold + row.account_email + '\n' + "--no address books--");
            } else {
                console.log(('#' + row.account_id + ": ").bold + row.account_email + '\n' + row.addressbook_name);
            }
        temp = row.account_id;
        });
    }
    // This code will output lines like:
    // #1: john@smith.com
    // #2: abc@def.com
    // #5: xx@yy.com
    connection.end();
    // Note that IDs do not have to be contiguous. If we DELETE rows, there will be holes in the ID list. This is normal.
});
