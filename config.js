require('dotenv').config();

const PORT = process.env.PORT || 5000;
module.exports.PORT = PORT;

module.exports.dbURI = process.env.dbURI;
module.exports.SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'secret key';

