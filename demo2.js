const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let sql = `
select food.id, food.name, kind.name as name2
from food inner join kind
on food.kind_id=kind.id;
`

db.serialize( () => {
db.all( sql, (error, row) => {
if(error) {
console.log('Error: ', error );
return;
}
for( let data of row ) {
console.log( data.id + ' : ' + data.name + ':' + data.name2 );
}
});
});
