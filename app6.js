const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 都道府県, 人口 from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {mes:"都道府県ごとの人口", data:row});
        })
    })
})
app.get("/db/:id", (req, res) => {
db.serialize( () => {
db.all("select id, 都道府県, 人口, 大学 from example where id=" + req.params.id + ";", (error, row) => {
if( error ) {
res.render('show', {mes:"エラーです"});
}
res.render('db', {data:row});
})
})
})

app.post("/insert", (req, res) => {
let sql = `
insert into example (都道府県,人口,大学) values ("` + req.body.name + `",` + req.body.jinko + `,` + req.body.daigaku + `);
`
console.log(sql);
db.serialize( () => {
db.run( sql, (error, row) => {
console.log(error);
if(error) {
res.render('show', {mes:"エラーです"});
}
res.redirect('/db');
});
});
console.log(req.body);
});

app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {mes:"都道府県ごとの人口", data:data});
        })
    })
})
app.get("/ban", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, cast(男性 as real) * 100 / cast(人口 as real) as result from example order by result" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {mes:"都道府県ごとの男性の割合", data:data});
        })
    })
})
app.get("/don", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, cast(男性 as INTEGER) * 学生数 / cast(人口 as INTEGER) as result from example order by result" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {mes:"都道府県ごとの男性の学生数", data:data});
        })
    })
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
