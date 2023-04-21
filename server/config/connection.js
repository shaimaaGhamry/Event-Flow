const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/event-flow',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// Export connection 
module.exports = mongoose.connection;
