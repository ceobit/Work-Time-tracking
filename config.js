require('dotenv').config();

const PORT = process.env.PORT || 5000;
module.exports.PORT = PORT;

if (process.env.NODE_ENV === 'production') {
  module.exports.SECRET_KEY = process.env.SECRET_KEY;
  module.exports.dbURI = process.env.dbURI;
} else {
  module.exports.SECRET_KEY = 'secret key';
  module.exports.dbURI = "mongodb+srv://Roman:301090@cluster0.pmym3.mongodb.net/workTime?retryWrites=true&w=majority";
}
