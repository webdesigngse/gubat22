/* System */
var express = require('express');
var mysql   = require('mysql');
var app     = express();

/* connection pool */
var UPLINK  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'thijsboerma_maati',
  debug           : false
});


function databaseHandler(req,res) {

  UPLINK.getConnection(function(err,connection){

    if(err) {
      res.json({"code" : 100, "status" : "Error establishing UPLINK." });
      return;
    }

    console.log('human_user connected, converted to #ID : '+ connection.threadId);

  });

}/* einde DB handler */

app.get("/",function(req,res){
  databaseHandler(req,res);
});

app.get("/END",function(req,res){
  console.log('END');
    UPLINK.end();
});


app.listen(3000);
