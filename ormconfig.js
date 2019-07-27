module.exports = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "jokepedia",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "logging": true,
}