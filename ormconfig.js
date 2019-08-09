module.exports = {
    "type": "mysql",
    //"url": "jokepedia.ctvb64yw20qg.us-east-1.rds.amazonaws.com",
    "host": "jokepedia.ctvb64yw20qg.us-east-1.rds.amazonaws.com",
    "port": 3306,
    "username": "root",
    "password": "jokepediaDatabase",
    "database": "jokepediaDB",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "logging": true,
}