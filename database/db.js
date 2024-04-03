const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Thakur', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB Connected to mongoose');
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
  });
  
//   const User = mongoose.model('User', userSchema);
  
module.exports = mongoose.model('User', userSchema);
