const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    MongoDB_url : process.env.MONGODB_URL,
    Acces_Token : process.env.ACCESS_TOKEN,
}