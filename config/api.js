const mongoose = require('mongoose');
const dbName = 'bee-network-net';

mongoose.createConnection(`mongodb://localhost/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${dbName} database`);
});
