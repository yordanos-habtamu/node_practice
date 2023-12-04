const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/process.env.DB_name",{useUnifiedTopology:true},{useNewUrlParser:true})
const db=mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});