const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});
//(9-4)//
app.get("/car", (req, res) => {
    //console.log(req.query.pop);    // ①
   
    let sql = `
    select car.id, car.name, maker.name as name2
    from car
    inner join maker
    on car.maker_id=maker.id
    `
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(row);    // ③
            res.render('car', {row:row});
        })
    })
})
//(9-5)//
app.get("/food", (req, res) => {
    //console.log(req.query.pop);    // ①
   
    let sql = `
    select food.id, food.name, kind.name as name2
    from food
    inner join kind
    on food.kind_id=kind.id
    `
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(row);    // ③
            res.render('car', {row:row});
        })
    })
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
