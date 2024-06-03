const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.get("/app/janken", (req, res) => {
let hand = req.query.hand;
const num = Math.floor( Math.random() * 3 + 1 );
let cpu_hand = '???';
if( num == 1 ) cpu_hand = 'グー';
else if( num == 2 ) cpu_hand = 'チョキ';
else if( num == 3 ) cpu_hand = 'パー';
let hantei = "non";
if( hand == "グー" ){
if( cpu_hand == "グー" ) hantei = "あいこ";
else if( cpu_hand == "チョキ" ) hantei = "勝ち";
else if( cpu_hand == "パー" ) hantei = "負け";
};
if( hand == "チョキ" ){
if( cpu_hand == "グー" ) hantei = "負け";
else if( cpu_hand == "チョキ" ) hantei = "あいこ";
else if( cpu_hand == "パー" ) hantei = "勝ち";
};
if( hand == "パー" ){
if( cpu_hand == "グー" ) hantei = "勝ち";
else if( cpu_hand == "チョキ" ) hantei = "負け";
else if( cpu_hand == "パー" ) hantei = "あいこ";
};
if( hand == "gu" ){
if( cpu_hand == "グー" ) hantei = "あいこ";
else if( cpu_hand == "チョキ" ) hantei = "勝ち";
else if( cpu_hand == "パー" ) hantei = "負け";
};
if( hand == "choki" ){
if( cpu_hand == "グー" ) hantei = "負け";
else if( cpu_hand == "チョキ" ) hantei = "あいこ";
else if( cpu_hand == "パー" ) hantei = "勝ち";
};
if( hand == "pa" ){
if( cpu_hand == "グー" ) hantei = "勝ち";
else if( cpu_hand == "チョキ" ) hantei = "負け";
else if( cpu_hand == "パー" ) hantei = "あいこ";
};
res.render( 'janken', {
your_hand: 'あなたの手は' + hand + 'です',my_hand: "相手の手は"+cpu_hand+"です",hantei: "判定は"+hantei+"です" } );
});
app.listen(8080, () => console.log("Example app listening on port 8080!"));

