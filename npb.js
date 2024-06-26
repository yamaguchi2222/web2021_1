const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('yakyu.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select team_id, チーム名, 所在地,本拠地 from npb;", (error, row) => {
            if( error ) {
                res.render('puro', {mes:"エラーです"});
            }
            res.render('npb', {mes:"プロ野球のチーム", data:row});
        })
    })
})

app.get("/player_db", (req, res) => {
    db.serialize( () => {
        db.all("select npb.チーム名 as team, 背番号, 選手名,ポジション, ヒット数, ホームラン数 from player inner join npb on player.team_id=npb.team_id;", (error, row) => {
            if( error ) {
                res.render('puro', {mes:"エラーです"});
            }
            res.render('player', {mes:"選手名鑑", data:row});
        })
    })
})

app.post("/insert",(req,res)=>{
let sql=`
insert into npb (team_id,チーム名,所在地,本拠地) values (`+ req.body.id + `,"` + req.body.team + `","` + req.body.where + `","` + req.body.stadium + `");
`
console.log(sql);
db.serialize( () => {
db.run( sql, (error, row) => {
console.log(error);
if(error) {
res.render('puro', {mes:"エラーです"});
}
res.redirect('/db');
});
});
console.log(req.body);
});

app.post("/player_insert",(req,res)=>{
let sql=`
insert into player (team_id,背番号,選手名,ポジション,ヒット数,ホームラン数) values (`+ req.body.id + `,` + req.body.number + `,"` + req.body.name + `","` + req.body.position + `",` + req.body.hit + `,` + req.body.homerun + `);
`
console.log(sql);
db.serialize( () => {
db.run( sql, (error, row) => {
console.log(error);
if(error) {
res.render('puro', {mes:"エラーです"});
}
res.redirect('/player_db');
});
});
console.log(req.body);
});

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
