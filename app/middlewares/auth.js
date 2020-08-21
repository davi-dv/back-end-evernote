require('dotenv').config();
const secret = process.env.JWT_TOKEN

const jwt = require('jsonwebtoken')
const User = require('../../models/user');


//criando middleware que confere se o token que foi passado na requisição,está correto
//se tiver correto vai alterar a requisição inserindo usuario
//se tiver errado vai dar não autorizado
const withAuth = (req,res,next)=>{
    const token = req.headers['x-access-token']
    if(!token)
      res.status(401).json({error:'não autorizado,token não encontrado'})
    else{
        jwt.verify(token,secret,(err,decode)=>{
            if(err)
            res.status(401).json({error:'token inválido!'})
            else{
                req.email = decode.email;
                User.findOne({email:decoded.email})
                .then(user=>{
                    req.user=user
                    next();
                }).catch(err=>{
                    res.status(401).json({error:err})
                })
            }
        })
    }
}

module.exports=withAuth