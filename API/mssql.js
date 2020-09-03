var sql = require('mssql');
var config = require('./dbConnection');


const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(poolConnect => {
        console.log('Connected to Database!')
        return poolConnect
    })
    .catch( err => console.log('Database Connection Failed! Bad Config: ', err));

    module.exports = {
        sql, poolPromise
    }

