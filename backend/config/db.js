const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://fernandooliveira:HenriqueForte1@universidade.oht8tgk.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao MongoDB Atlas');
  } catch (err) {
    console.error('Erro de conexão:', err);
    process.exit(1);
  }
};

module.exports = connectDB;