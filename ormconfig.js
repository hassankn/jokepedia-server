module.exports = {
    "type": "mysql",
    "url": "mysql://bb1313b17f497f:3bd8f815@us-cdbr-iron-east-02.cleardb.net/heroku_61285ef3bcb8e3b",
    // "host": "localhost",
    // "port": 3306,
    // "username": "root",
    // "password": "password",
    // "database": "test_joke",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "logging": true,
}