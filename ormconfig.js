module.exports = {
    "type": "mysql",
    "url": "mysql://b58569e7556329:df5cf2e6@us-cdbr-iron-east-02.cleardb.net/heroku_858243da9acdbca",
    // "host": "localhost",
    // "port": 3306,
    // "username": "root",
    // "password": "password",
    // "database": "jokepedia",
    "useNewUrlParser": true,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "logging": true,
}