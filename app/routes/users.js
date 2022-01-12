var express = require('express');
var router = express.Router();
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
require ('dotenv').config();
const withAuth = require('../middlewares/auth');
const secret = process.env.JWT_TOKEN


//esse endpoint registra o usuário
router.post('/register',async(req,res)=>{
  const {name,email,password}=req.body
  const user = new User({name,email,password})

  try {
    await user.save()
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error:'Error ao registrar novo usuário'})
  }
})

//esse endpoint faz o login do usuario e cria um token para o mesmo com jwt
router.post('/login',async(req,res)=>{
  const {email,password} = req.body
 

  try {
    const  user = await User.findOne({email})

    if(!user)
        res.status(401).json({error:'Email ou senha incorretos!'})
    else{
      //acessa funcão criada no model user.js e compara
      user.isCorrectPassword(password,function(err,same){
        if (!same)
        res.status(401).json({error:'Email ou senha incorretos!'})
        //se der certo gera um token para o usuário
        else{
          const token = jwt.sign({email},secret,{expiresIn:'30d'});
          res.json({user:user,token:token})
        }
      })
    }    
  } catch (error) {
    res.status(500).json({error:'Erro interno,tente mais tarde'})
    
  }
})
// esse endpoint recebe o email de um usuario e atualiza 
router.put('/', withAuth, async function(req, res) {
  const { name, email } = req.body;

  try {
    var user = await User.findOneAndUpdate(
      {_id: req.user._id}, 
      { $set: { name: name, email: email}}, 
      { upsert: true, 'new': true }
    )
    res.json(user);
  } catch (error) {
    res.status(401).json({error: error});
  }
});
// esse endpoint recebe a senha do usuario e atualiza ela
router.put('/password', withAuth, async function(req, res) {
  const { password } = req.body;

  try {
    var user = await User.findOne({_id: req.user._id})
    user.password = password
    user.save()
    res.json(user);
  } catch (error) {
    res.status(401).json({error: error});
  }
});
// esse endpoint deleta um usuario pelo id
router.delete('/', withAuth, async function(req, res) {
  try {
    let user = await User.findOne({_id: req.user._id });
    await user.delete();
    res.json({message: 'OK'}).status(201);
  } catch (error) {
    res.status(500).json({error: error});
  }
});
	
module.exports = router;
