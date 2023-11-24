const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql2 = [
  `insert into test ("name") values ("suda");`,
  `insert into test ("name") values ("foo");`,
  `insert into test ("name") values ("bar");`
  ]

for( let sql of sql2 ) {
db.serialize( () => {
  db.run( sql, (error, row) => {
    if(error) {
      console.log('Error: ', error );
      return;
    }
    console.log( "データを追加しました" );
  });
});
};
