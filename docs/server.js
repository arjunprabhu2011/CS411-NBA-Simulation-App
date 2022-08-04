var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql2');


var connection = mysql.createConnection({
                host: '34.132.105.27',
                user: 'root',
                password: 'Teamraje12345',
                database: 'RajeApplication'
});

connection.connect;

var app = express();
 
// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '../public'));

app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());


app.get('/create-player', function(req, res, next) {
    res.render('insert_player', { title: 'create-player' });
  });
  app.post('/create-player', function(req, res, next) {
  
  var PlayerID = req.body.PlayerID; 
  var Player_Name = req.body.Player_Name;
  var Active_From = req.body.Active_From;
  var Active_To = req.body.Active_To;
  var Position = req.body.Position;
  var Height = req.body.Height;
  var Weight = req.body.Weight;
  var Birth_Date = req.body.Birth_Date;
  var Colleges = req.body.Colleges; 
  
  var sql_insert1 = `INSERT INTO Player VALUES ("${PlayerID}", "${Player_Name}", "${Active_From}" ,"${Active_To}" ,"${Position}" ,"${Height}" ,"${Weight}", "${Birth_Date}", "${Colleges}")`;
  
  console.log(sql_insert1  );
    connection.query(sql_insert1 , function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      req.flash('success', 'Data added successfully!');
      res.redirect('/create-player');
    });
  });

  app.get("/create-stats", function(req, res, next) {
    res.render("insert_stats", { title: "create-stats" });
  });
  app.post("/create-stats", function(req, res, next) {
      var PlayerID2 = req.body.PlayerID2; 
  var TeamID= req.body.TeamID;
  var Year= req.body.Year;
  var age= req.body.age;
  var games_played= req.body.games_played;
  var minutes_played= req.body.minutes_played;
  var PTS= req.body.PTS;
  var AST= req.body.AST;
  var turnovers= req.body.turnovers; 
  var FG = req.body.FG ;
  var FT = req.body.FT;
  var _3P = req.body._3P;
  var _3P_Attempt = req.body._3P_Attempt ;
  var ORB = req.body.ORB;
  var DRB = req.body.DRB;
  var PF = req.body.PF;
  sql_insert2 = `INSERT INTO PlayerStats VALUES ("${PlayerID2}", "${TeamID}", "${Year}", "${age}", "${games_played}", "${minutes_played}", "${PTS}", "${AST}", "${turnovers}", "${FG}", "${FT}", "${_3P}", "${_3P_Attempt}", "${ORB}", "${DRB}", "${PF}")`;
  console.log(sql_insert2);
    connection.query(sql_insert2 , function(err, result) {
      if (err) throw err;
      console.log("record inserted");
      req.flash("success", "Data added successfully!");
      res.redirect("/create-stats");
    });
  });

  app.get("/team-search", function(req, res, next) {
    res.render("search", { title: "team-search"});
  });
var Global_Team_Name ="";
  app.post("/team-search", function(req, res, next) {
  
  var Team_Name= req.body.Team_Name;
  Global_Team_Name = Team_Name;

      res.redirect("/team-search-results");
    
  });
  app.get('/team-search-results', function(request, response){
    connection.query(`SELECT * FROM Team WHERE Team_Name LIKE "%"${Team_Name}"%"`, function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

  
  app.get("/update-stats", function(req, res, next) {
    res.render("update_stats", { title: "update-stats"});
  });
  app.post("/update-stats", function(req, res, next) {
  var PlayerID2 = req.body.PlayerID2; 
  var TeamID= req.body.TeamID;
  var Year= req.body.Year;
  var age= req.body.age;
  var games_played= req.body.games_played;
  var minutes_played= req.body.minutes_played;
  var PTS= req.body.PTS;
  var AST= req.body.AST;
  var turnovers= req.body.turnovers; 
  var FG = req.body.FG ;
  var FT = req.body.FT;
  var _3P = req.body._3P;
  var _3P_Attempt = req.body._3P_Attempt ;
  var ORB = req.body.ORB;
  var DRB = req.body.DRB;
  var PF = req.body.PF;
  
  var sql_update = `UPDATE PlayerStats SET PlayerID = "${PlayerID2}", TeamID = "${TeamID}", Year = "${Year}", age = "${age}", games_played = "${minutes_played}", PTS = "${PTS}", AST = "${AST}", turnovers = "${turnovers}", FG= "${FG}",FT = "${FT}", 3P = "${_3P}", 3P_Attempt = "${ _3P_Attempt}", ORB= "${ ORB}",DRB = "${ DRB}",PF = "${PF}" WHERE PlayerID = "${PlayerID2}" AND Year = "${Year}" AND minutes_played = "${minutes_played}"`;
  console.log(sql_update );
    connection.query(sql_update  , function(err, result) {
      if (err) throw err;
      console.log("record updated");
      req.flash("success", "Data updated successfully!");
      res.redirect("/update-stats");
    });
  });

  app.get("/delete-stats", function(req, res, next) {
    res.render("delete_stats", { title: "delete-stats"});
  });
  app.post("/delete-stats", function(req, res, next) {
  var PlayerID2 = req.body.PlayerID2;
  var Year =req.body.Year;
  var minutes_played = req.body.minutes_played;
  
  var sql_delete1 = `DELETE FROM PlayerStats WHERE PlayerID = "${PlayerID2}" AND Year = "${Year}" AND minutes_played = "${minutes_played}"`;
  
  console.log(sql_delete1  );
    connection.query(sql_delete1   , function(err, result) {
      if (err) throw err;
      console.log("record updated");
      req.flash("success", "Data deleted successfully!");
      res.redirect("/delete-stats");
    });
  });
  
  app.get("/delete-player", function(req, res, next) {
    res.render("delete_player", { title: "delete-player"});
  });
  app.post("/delete-player", function(req, res, next) {
  var PlayerID2 = req.body.PlayerID2;
  
  var sql_delete2 = `DELETE FROM Player WHERE PlayerID = "${PlayerID2}"`; 

  console.log(sql_delete2);
    connection.query(sql_delete2, function(err, result) {
      if (err) throw err;
      console.log("record updated");
      req.flash("success", "Data deleted successfully!");
      res.redirect("/delete-player");
    });
  });
  
  app.get("/query1", function(req, res, next) {
    res.render("search", { title: "query1"});
  });
  app.post('/query1', function(req, res, next) {
   
      res.redirect("/query1results");
    
  });
  app.get("/query1results", function(req, response) {
    connection.query( `SELECT Team_Name, t1.Average_Points, t1.Average_Assists, t1.average_3percent 
          FROM Team NATURAL JOIN (SELECT TeamID, AVG(PTS) AS Average_Points, AVG(AST) AS Average_Assists, AVG(3P) AS average_3percent
                              FROM Player NATURAL JOIN PlayerStats NATURAL JOIN Team
                              WHERE Player_Name LIKE "G%" OR AST > 2
                              GROUP BY TeamID) as t1`, function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

  app.get("/query2", function(req, res, next) {
    res.render("search", { title: "query2"});
  });
  
  app.post('/query2', function(req, res, next) {
    
      res.redirect("/query2results");
   
  });
  app.get("/query2results", function(req, response) {
    connection.query(`SELECT ArenaID, Average_Attendance, AVG(3P) AS Average_3percentage, AVG(FG) AS Average_FieldGoalpercentage
            FROM PlayerStats JOIN Team USING(TeamID) JOIN ArenaStats USING (ArenaID)	
            WHERE Average_Attendance > 18000
            GROUP BY ArenaID
            ORDER BY Average_FieldGoalpercentage ASC, Average_3percentage ASC`, function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});
    
var http = require('http').Server(app);
var port = 80;
    
http.listen(port, function() {
  console.log('listening to port 80');
});
  
  
