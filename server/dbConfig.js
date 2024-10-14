const mongoose = require('mongoose');

const Connect = () => {
  // connect to a deployed mongo db
  mongoose.connect('mongodb+srv://etudiantg10:dkloa123@cluster0.yj4fwrt.mongodb.net/myDatabaseName?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Connected to MongoDB');
  });
}

module.exports = Connect;


// mongodb://localhost:27017/social-app

// mongoose.connect('mongodb+srv://etudiantg10:dkloa123@cluster0.yj4fwrt.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// db.once('open', function () {
//   console.log('Connected to MongoDB');
// });
