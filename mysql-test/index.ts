import * as mysql from 'mysql';

// Connections
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.connect();

connection.query('SELECT 1 + 2 AS solution', function (err: mysql.QueryError, rows: mysql.RowDataPacket[], fields: mysql.FieldPacket) {
    if (err) {
        throw err;
    }

    console.log('The solution is: ', rows[0]['solution']);
});


let query = connection.query('SELECT * FROM backoffice_grails.creative_invite LIMIT 10');
query.on('result', function (row: any) {
    // Pausing the connnection is useful if your processing involves I/O
    connection.pause();

    let processRow = (row: any, cb: () => void) => {
        console.info(row.title, 'by', row.host);
        cb();
    };

    processRow(row, function () {
        connection.resume();
    });
})
.on('end', function () {
    // all rows have been received
});

connection.end();
