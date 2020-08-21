const mongoose = require('mongoose');
mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost/note-back-end',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(()=>{
    console.log('Conectado com sucesso')
}).catch((err)=>{
    console.log(err)
})