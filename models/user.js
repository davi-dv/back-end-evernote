const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//campos para armazenar as info do usuário
let userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


//transforma password antes de salvar no banco em hash
userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10,
            (err, hashedPassword) => {
                if (err)
                    next(err)
                else {
                    this.password = hashedPassword
                    next()
                }
            }
        )
    }
})

//compara senha com o hash no banco
userSchema.methods.isCorrectPassword = function(password,callback){
    bcrypt.compare(password,this.password,function(err,same){
        if(err)
        callback(err)
        else
            callback(err,same)
        
    })
}
module.exports = mongoose.model('User', userSchema)