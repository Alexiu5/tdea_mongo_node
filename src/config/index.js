
module.exports = {
    PORT: process.env.PORT | 3000,
    DATABASEURL: 'mongodb://localhost:27017',
    DB_NAME: 'tdea_database',
    ONLINEDBCONNECT:'mongodb+srv://alex:Reactlover123**>@cluster0-ztcow.mongodb.net/test?retryWrites=true&w=majority',
    ENVIROMENT: process.env.NODE_ENV || 'local',
    SECRET_KEY: 'virtual_tdea',
    SESSION_KEY_STORAGE: 'tokenjwt'
}