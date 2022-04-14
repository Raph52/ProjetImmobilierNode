const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://Raphael:QpkKRbAjZ36JD8wi@cluster0.sszvr.mongodb.net/immo?retryWrites=true&w=majority', 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});
